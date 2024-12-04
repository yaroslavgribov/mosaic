export function selection_sort(xs: number[]) {
    for (let i = 0; i < xs.length - 1; ++i) {
        let min_idx = i

        for (let j = i + 1; j < xs.length; ++j) {
            if (xs[j] < xs[min_idx]) {
                min_idx = j;
            }
        }

        if (min_idx !== i) {
            const tmp = xs[i]
            xs[i] = xs[min_idx]
            xs[min_idx] = tmp
        }
    }

    return xs;
}
