import { expect, test } from "vitest";
import { BubbleSort } from "../BubbleSort";

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
	expect(sorted(BubbleSort([1, 2, 3, 4]))).toBe(true);
	expect(sorted(BubbleSort([3, 2, 1]))).toBe(true);
});
