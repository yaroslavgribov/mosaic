import { test, expect } from 'vitest'
import { sorted } from './test-utils'
import { selection_sort } from '../selection_sort'

test('selection sort', () => {
    console.log(selection_sort([1,2,3,4]))
    expect(sorted(selection_sort([1,2,3,4]))).toBe(true)
    expect(sorted(selection_sort([3,2,1,4]))).toBe(true)
    expect(sorted(selection_sort([4,3,2,1,4]))).toBe(true)
    expect(sorted(selection_sort([-1,3,2,-1,4]))).toBe(true)
})
