import { expect, test } from "vitest";
import { BinarySearch } from "../BinarySearch";

test("It works", () => {
	const xs = Array.from({ length: 100 }, (_, index) => index + 1);
	expect(BinarySearch(xs, 99)).toBe(98);
});
