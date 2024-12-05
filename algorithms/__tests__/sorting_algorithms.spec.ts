import { expect, test } from "vitest";
import { bubble_sort } from "../bubble_sort";
import { bubble_while } from "../bubble_while";
import { selection_sort } from '../selection_sort'
import { insertion_sort } from '../insertion_sort'
import { sorted } from './test-utils'

test("bubble sort", () => {
	expect(sorted(bubble_while([1, 2, 3, 4]))).toBe(true);
	expect(sorted(bubble_while([3, 2, 1]))).toBe(true);
	expect(sorted(bubble_sort([6, 2, 1, 4]))).toBe(true);
	expect(sorted(bubble_sort([3, 2, 1]))).toBe(true);
});

test('selection sort', () => {
    expect(sorted(selection_sort([1,2,3,4]))).toBe(true)
    expect(sorted(selection_sort([3,2,1,4]))).toBe(true)
    expect(sorted(selection_sort([4,3,2,1,4]))).toBe(true)
    expect(sorted(selection_sort([-1,3,2,-1,4]))).toBe(true)
})


test('insertion sort', () => {
    expect(sorted(insertion_sort([1,2,3,4]))).toBe(true)
    expect(sorted(insertion_sort([3,2,1,4]))).toBe(true)
    expect(sorted(insertion_sort([4,3,2,1,4]))).toBe(true)
    expect(sorted(insertion_sort([-1,3,2,-1,4]))).toBe(true)
})
