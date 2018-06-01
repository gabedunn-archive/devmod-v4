/*
 * Gabe Dunn 2018
 * Common functions in one place.
 */

import colours from './colours'

export const capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`

export const errorMessage = (title, description) => {
  return {
    title,
    color: colours.red,
    description
  }
}
