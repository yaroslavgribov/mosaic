
export function sorted(xs: number[]) {
	let s = true;

	xs.slice(0, xs.length).forEach((x, index) => {
		if (x > xs[index + 1]) {
			s = false;
		}
	});

	return s;
}
