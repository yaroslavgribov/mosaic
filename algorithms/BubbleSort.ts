function swap(as: number[], i1: number, i2: number) {
	const tmp = as[i1];
	as[i1] = as[i2];
	as[i2] = tmp;
}

export function BubbleSort(xs: number[]) {
	for (let i = 0; i < xs.length; ++i) {
		for (let j = 0; j < xs.length - 1 - i; j++) {
			if (xs[j] > xs[j + 1]) swap(xs, j, j + 1);
		}
	}

	return xs;
}
