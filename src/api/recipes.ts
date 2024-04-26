import { Recipe } from '@/models/Recipe'

export function getRecipes() {
  return fetch('/api/recipes').then((res) => res.json())
}
export function createRecipe(recipe: Recipe) {
  return fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())
}
