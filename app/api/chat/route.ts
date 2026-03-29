// =============================================================================
// Gemini-powered Chat API — POST /api/chat (Direct REST, no SDK)
// =============================================================================

import { NextResponse } from 'next/server';
import { getCVAsText } from '@/data/resume';
import type { ChatRequest } from '@/types';

const SYSTEM_PROMPT = `You are Muhammad Qasim. You are speaking directly to a visitor on your portfolio website.

Identity & Rules:
- Use first-person pronouns: "I", "me", "my", "mine". 
- If asked "Who are you?", answer as Qasim, the developer behind this site.
- Tone: Technical, precise, and slightly witty. You are a builder, not a corporate bot.
- Efficiency: Highlight your impact (e.g., "I boosted conversion by 70%", "I optimized the front-end for sub-second loads").
- Data Source: Use the CV text below as your "memory." If a detail isn't there, don't hallucinate; just say, "I haven't added that to my public portfolio yet."
- Constraint: Keep it brief (2-3 sentences) unless they dig for technical specs.

Formatting: 
- Use clean Markdown. 
- Avoid generic "passionate developer" cliches.

Follow-up Suggestions:
- At the END of EVERY response, add exactly 3 short follow-up questions the user might ask next.
- Format them on the last line like this: [SUGGESTIONS: "question 1" | "question 2" | "question 3"]
- The suggestions must be contextually relevant to what was just discussed.
- Keep each suggestion under 40 characters.
- Do NOT put suggestions inside the main response body.

My CV Data:
${getCVAsText()}

Now, respond to the user as if you are Qasim.`;

/** Parse suggestions from the end of a Gemini response */
function parseSuggestions(text: string): { message: string; suggestions: string[] } {
  const match = text.match(/\[SUGGESTIONS:\s*(.+?)\]\s*$/);
  if (!match) return { message: text.trim(), suggestions: [] };

  const message = text.replace(/\[SUGGESTIONS:\s*.+?\]\s*$/, '').trim();
  const suggestions = match[1]
    .split('|')
    .map((s) => s.trim().replace(/^"|"$/g, ''))
    .filter((s) => s.length > 0)
    .slice(0, 3);

  return { message, suggestions };
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: '', error: 'GEMINI_API_KEY not configured. Set it in .env.local' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ChatRequest;

    if (!body.message?.trim()) {
      return NextResponse.json(
        { message: '', error: 'Message is required.' },
        { status: 400 }
      );
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          ...((body.history || [])
            .filter((m) => m.content.trim())
            .map((m) => ({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.content }],
            }))),
          { role: 'user', parts: [{ text: body.message.trim() }] },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { message: '', error: 'QasimAI is taking a quick breath (Rate Limited). Try again in 30 seconds.' },
          { status: 429 }
        );
      }
      throw new Error(data.error?.message || 'API Error');
    }

    const rawText = data.candidates[0].content.parts[0].text;
    const { message: text, suggestions } = parseSuggestions(rawText);
    return NextResponse.json({ message: text, suggestions });
  } catch (error) {
    console.error('[QasimAI] Error:', error);
    return NextResponse.json(
      { message: '', error: 'Service temporarily unavailable.' },
      { status: 500 }
    );
  }
}
