import { expect, test } from "vitest";
import { BubbleSort } from "../BubbleSort";
import { bubble_while } from "../bubble_while";

function sorted(xs: number[]) {
	let s = true;

	xs.slice(0, xs.length).forEach((x, index) => {
		if (x > xs[index + 1]) {
			s = false;
		}
	});

	return s;
}

test("BubbleSort", () => {
	expect(sorted(bubble_while([1, 2, 3, 4]))).toBe(true);
	expect(sorted(bubble_while([3, 2, 1]))).toBe(true);
	expect(sorted(BubbleSort([6, 2, 1, 4]))).toBe(true);
	expect(sorted(BubbleSort([3, 2, 1]))).toBe(true);
});
