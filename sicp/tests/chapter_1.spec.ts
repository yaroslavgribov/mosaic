import { describe, expect, test } from "vitest";
import * as chapter_1 from "../exercises/chapter_1";

describe("chapter 1", () => {
	test("1.2", () => {
		expect(chapter_1.__t).toEqual(-37 / 150);
	});

	test("1.3", () => {
		expect(chapter_1.sum_of_larger_squares(2, 3, 1)).toEqual(
			Math.pow(2, 2) + Math.pow(3, 2),
		);
	});

	test("1.6", () => {
		expect(chapter_1.sqrt_iter(1, 9)).toBeCloseTo(3);
		expect(chapter_1.sqrt_iter(1, 0.0001)).toBeCloseTo(0.01);
	});

	test("1.7", () => {
		expect(chapter_1.cube_root(64)).toBeCloseTo(Math.cbrt(64));
	});

	test("1.10", () => {
		expect(chapter_1.A(2, 4)).toBe(Math.pow(2, 16));
	});

	test("fib", () => {
		expect(chapter_1.fib(5)).toBe(5);
	});

	test("fib_iter", () => {
		expect(chapter_1.fib_iter(1, 0, 5)).toBe(5);
	});

	test("counting coins", () => {
		expect(chapter_1.count_change(11)).toBe(4);
	});

	test("1.11", () => {
		expect([0, 1, 2].map(chapter_1.f1_11_rec)).toEqual([0, 1, 2]);
		expect(chapter_1.f1_11_rec(3)).toEqual(4);
		expect(chapter_1.f1_11_rec(4)).toEqual(11);
		expect(chapter_1.f1_11_iter(3)).toEqual(4);
		expect(chapter_1.f1_11_iter(4)).toEqual(11);
	});

    test('pascal triangle', () => {
        expect(chapter_1.pascal_triangle(1)).toEqual([[1]])
        expect(chapter_1.pascal_triangle(2)).toEqual([[1], [1,1]])
        expect(chapter_1.pascal_triangle(3)).toEqual([[1], [1,1], [1,2,1]])
        expect(chapter_1.pascal_triangle(4)).toEqual([[1], [1,1], [1,2,1], [1, 3, 3, 1]])
    })
});
