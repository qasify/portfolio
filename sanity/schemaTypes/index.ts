import { type SchemaTypeDefinition } from 'sanity'
import { profileType } from './profileType'
import { experienceType } from './experienceType'
import { projectType } from './projectType'
import { skillType, educationType, awardType } from './otherTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profileType,
    experienceType,
    projectType,
    skillType,
    educationType,
    awardType,
  ],
}
