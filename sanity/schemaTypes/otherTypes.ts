import { defineField, defineType } from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
    }),
    defineField({
      name: 'level',
      title: 'Competency Level',
      type: 'string',
      options: {
        list: ['Advanced', 'Intermediate', 'Beginner'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'keywords',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({ name: 'institution', type: 'string', title: 'Institution' }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'area', type: 'string', title: 'Field of Study' }),
    defineField({ name: 'studyType', type: 'string', title: 'Degree / Study Type' }),
    defineField({ name: 'startDate', type: 'date', title: 'Start Date' }),
    defineField({ name: 'endDate', type: 'date', title: 'End Date' }),
    defineField({ name: 'gpa', type: 'string', title: 'GPA' }),
  ],
})

export const awardType = defineType({
  name: 'award',
  title: 'Award / Certification',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'date', type: 'date', title: 'Date' }),
    defineField({ name: 'awarder', type: 'string', title: 'Awarder' }),
    defineField({ name: 'summary', type: 'text', title: 'Summary' }),
  ],
})
