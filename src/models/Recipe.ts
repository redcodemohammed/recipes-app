export const units = ['all', 'kg', 'g', 'l', 'ml'] as const
export type Unit = (typeof units)[number]
export interface Recipe {
  name: string
  daysToExpire?: number
  active: boolean
  unit: Exclude<Unit, 'all'>
}
