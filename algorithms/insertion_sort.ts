export function insertion_sort(xs: number[]) {
	// walk throught the array, starting with the second element,
    // because it will be moved to the first position in case it's smaller
	for (let i = 1; i < xs.length; ++i) {
        // extract the current element
		const temp = xs[i];

        // we could do i - 1 to start with the previous
		let position = i - 1;

		while (position >= 0 && xs[position] > temp) {
			if (xs[position] > temp) {
				xs[position + 1] = xs[position];
			}

			position--;
		}

		xs[position + 1] = temp;
	}

	return xs;
}
