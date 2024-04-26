import { Recipe } from '@/models/Recipe'
import { NextRequest, NextResponse } from 'next/server'

const data: Recipe[] = []

export async function GET() {
  // TODO: REMOVE ME, these were added to simulate a slow network and test loading states
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  // TODO: REMOVE ME, these were added to simulate a slow network and test loading states
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // randomly throw error to test error states
  if (Math.random() < 0.1) {
    return NextResponse.json({ message: 'An error occurred', error: true }, { status: 400 })
  }

  const recipe = (await request.json()) as Recipe
  data.push(recipe)
  return NextResponse.json(recipe)
}
