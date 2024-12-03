export function bubble_while(xs: number[]) {
	let unsorted_until_index = xs.length;
	let sorted = false;

	while (!sorted) {
		sorted = true;

		for (let i = 0; i < unsorted_until_index; ++i) {
			if (xs[i] > xs[i + 1]) {
				[xs[i], xs[i + 1]] = [xs[i + 1], xs[i]];
				sorted = false;
			}

			--unsorted_until_index;
		}
	}

	return xs;
}
