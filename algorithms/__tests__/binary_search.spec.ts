
import { expect, test } from "vitest";
import { binary_search } from "../binary_search";

test("binary search", () => {
	const xs = Array.from({ length: 100 }, (_, index) => index + 1);
	expect(binary_search(xs, 99)).toBe(98);
});
