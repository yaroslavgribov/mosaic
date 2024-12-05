export function binary_search(xs: number[], x: number) {
	let lo = 0;
	let hi = xs.length;

	while (lo < hi) {
		const m = Math.floor(lo + (hi - lo) / 2);
		const el = xs[m];

		if (el === x) {
			return m;
		}

		if (x < el) {
			hi = m;
		} else {
			lo = m + 1;
		}
	}

	return -1;
}
