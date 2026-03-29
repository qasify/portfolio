'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface PhysicsSkillsProps {
  skills: { name: string; level: number }[];
}

export default function PhysicsSkills({ skills }: PhysicsSkillsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !sceneRef.current) return;

    // Only set up once
    if (engineRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Dimensions
    const width = sceneRef.current.clientWidth;
    const height = 400;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add boundaries (walls and floor)
    const wallOptions = { 
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    
    Composite.add(world, [
      Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions), // Bottom
      Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions), // Left
      Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions), // Right
    ]);

    // Create skill bodies (pill shapes)
    const skillBodies = skills.map((skill, index) => {
      // Base width on text length roughly
      const pxWidth = Math.max(80, skill.name.length * 10 + 40);
      const pxHeight = 44;
      
      const x = (width / skills.length) * index + 40 + (Math.random() * 50 - 25);
      const y = -100 - (Math.random() * 300);

      // We use a rectangle with high chamfer to make it a pill
      const body = Bodies.rectangle(x, y, pxWidth, pxHeight, {
        chamfer: { radius: pxHeight / 2 },
        restitution: 0.6, // Bounciness
        friction: 0.1,
        render: {
          fillStyle: '#06b6d4', // Accent color
          strokeStyle: '#22d3ee',
          lineWidth: 2,
          // Since matter.js doesn't natively draw text easily in the basic renderer,
          // we use a sprite/text trick, but for basic implementation we rely on 
          // a custom render loop override or HTML overlay.
          // To keep it clean and robust without React mapping overhead on 60fps,
          // we inject raw Canvas text drawing.
        }
      });
      
      // Store text in body for later drawing
      (body as any).skillName = skill.name;
      return body;
    });

    Composite.add(world, skillBodies);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Override the render event to draw custom text on the bodies
    Matter.Events.on(render, 'afterRender', () => {
      const context = render.context;
      
      skillBodies.forEach((body) => {
        // Only draw if body is relatively visible
        if (body.position.y > height + 100) return;

        context.beginPath();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);
        
        // Draw Text
        context.font = 'bold 14px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#0b0f1a'; // bg-primary for text
        context.fillText((body as any).skillName, 0, 0);

        context.rotate(-body.angle);
        context.translate(-body.position.x, -body.position.y);
      });
    });

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && sceneRef.current?.contains(render.canvas)) {
        sceneRef.current.removeChild(render.canvas);
      }
      Composite.clear(world, false, false);
      Engine.clear(engine);
    };
  }, [inView, skills]);

  return (
    <div className="w-full relative bg-bg-secondary/30 rounded-2xl border border-border-subtle overflow-hidden relative cursor-grab active:cursor-grabbing">
      <div className="absolute top-4 left-4 z-10 text-xs font-mono text-text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
        Physics Engine Active (Drag to interact)
      </div>
      <div ref={sceneRef} className="w-full h-[400px]" />
    </div>
  );
}
