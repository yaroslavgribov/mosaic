/** Exercise 1.2
 * translate the following into JS
 * 5 + 4 + (2 - (3 - (6 + 4/5)))
 * ----------------------------
 * 3(6 - 2)(2 - 7)
 */
export const __t =
	(5 + 4 + (2 - (3 - (6 + 4 / 5)))) / (3 * ((6 - 2) * (2 - 7)));

/**
 * Exercise 1.3
 * Declare a function that takes three numbers as arguments and returns the sum of the squares
 * of the two larger numbers.
 */
const square = (x) => x ** 2;
const abs = Math.abs;
const average = (x, y) => (x + y) / 2;

export const sum_of_larger_squares = (a, b, c) => {
	const min_x = Math.min(a, b, c);

	return square(a) + square(b) + square(c) - square(min_x);
};

const conditional = (cond, then_clause, else_clause) =>
	cond ? then_clause : else_clause;

export const sqrt_iter = (guess, x) => {
	const is_good_enough = (g, x) => {
		return abs(square(g) - x) < 0.001;
	};

	const improve = (g, x) => {
		return average(g, x / g);
	};

	// the previous strategy doesn't work for very large or very small numbers,
	// for example sqrt_iter(1, 0.0001) returns 0.03 or something instead of expected 0.01
	const is_good_enough_alt = (g, x) => {
		return abs(improve(g, x) - g) < 0.00001;
	};

	return is_good_enough_alt(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
};

export const cube_root = (x) => {
	const cube_root_iter = (guess, x) => {
		const improve_cbrt = (g, x) => {
			return (x / Math.pow(g, 2) + 2 * g) / 3;
		};

		const is_good_enough = (g, x) => {
			const g_next = improve_cbrt(g, x);
			return abs(g_next - g) < 0.00001;
		};

		if (is_good_enough(guess, x)) {
			return guess;
		}

		return cube_root_iter(improve_cbrt(guess, x), x);
	};

	return cube_root_iter(1, x);
};

/**
 *
 * function plus(a, b) {
 *   return a === 0 ? b : inc(plus(dec(a), b));
 * }
 * plus(4,5)

 * plus(4 - 1, 5) + 1
 * (plus(3 - 1, 5) + 1) + 1
 * plus(2 - 1, 5) + 1 + 1 + 1
 * plus(1 - 1, 5) + 1 + 1 + 1 + 1
 * 5 + 1 + 1 + 1 + 1
 * Recursive

 * function plus(a, b) {
 *     return a === 0 ? b : plus(dec(a), inc(b));
 * }
 * plus(3, 6)
 * plus(2, 7)
 * plus(1, 8)
 * plus(0, 9)
 * 9
 * Iterative
 */

export function A(x, y) {
	if (y === 0) {
		return 0;
	}

	if (y === 1) {
		return 2;
	}

	if (x === 0) {
		return 2 * y;
	}

	console.log("iterated", x, y);

	return A(x - 1, A(x, y - 1));
}

// A(1, 3)
// 4
// A(0, A(1, 2))
// A(0, A(0, A(1, 1)))
// A(0, A(0, 2)
// A(0, 4)
// 8
//
// A(2, 2)
// A(1, A(2, 1))
// A(1, 2)
// A(0, A(1, 1))
// A(0, 2)
// 4
// A(2, 3)
// A(1, A(2, 2))
// A(1, A(1, A(2, 1))
// A(1, A(0, 4))
// A(0, 8)
// 16
//
// A(2,4)
// A(1, A(2, 3))
// A(1, A(1, A(2, 2))
// A(1, A(1, A(1, A(2, 1))
// A(1, A(1, A(0, A(1, 1))))
// A(1, A(1, A(0, 2))
// A(1, A(1, 4))
// A(1, A(0, A(1, 3))
// A(1, A(0, A(0, A(1, 2))
// A(1, A(0, A(0, A(0, A(1, 1)))))
// A(1, A(0, A(0, A(0, 2))))
// A(1, A(0, A(0, 4)))
// A(1, A(0, 8))
// A(1, 16)
// A(0, A(0, A(1, 15)))
// A(0, A(0, A(0, A(1, 14))))
// A(0, A(0, A(0, A(0, A(1, 13)))))
// A(0, A(0, A(0, A(0, A(0, A(1, 12))))))
// A(0, A(0, A(0, A(0, A(0, A(0, A(1, 11)))))))
// A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(1, 10))))))))
// A(0, A(0, A(0, A(0, A(0, A(0, 1024))))))
// A(0, A(0, A(0, A(0, A(0, 2048)))))
// A(0, A(0, A(0, A(0, 4096))))
// A(0, A(0, A(0, 8192)))
// A(0, A(0, 16384)
// A(0, 32768)
// 65536
//
// Math.pow(2, Math.pow(4, 2))
// Math.pow(2, 25

export function fib(n) {
	if (n === 0) return 0;
	if (n === 1) return 1;

	return fib(n - 1) + fib(n - 2);
}

// fib(2)
// fib(1) + fib(0)
// 1 + 0
// 1
// fib(3)
// fib(2) + fib(1)
// fib(1) + fib(0) + 1
// 2
//
// fib(4)
// fib(3) + fib(2)
// 3
//
// fib(5)
//
// fib(4) + fib(3)
// 5

export function fib_iter(a, b, n) {
	let s = a;
	let r = b;
	let count = n;

	while (count > 0) {
		const p = s;
		s = r + s;
		r = p;
		--count;
	}

	return r;
}

// fib(1, 0, 5)
// fib(1 + 0, 1, 4)
// fib(1 + 1, 1, 3)
// fib(2 + 1, 2, 2)
// fib(3 + 2, 3, 1)
// fib(8, 5, 0)
// 5

export function count_change(amount) {
	function first_denomination(n) {
		if (n === 1) {
			return 1;
		}

		if (n === 2) {
			return 5;
		}

		if (n === 3) {
			return 10;
		}

		if (n === 4) {
			return 25;
		}

		if (n === 5) {
			return 50;
		}

		return 0;
	}

	function cc(amount, kinds_of_coins) {
		if (amount === 0) {
			return 1;
		}

		if (amount < 0 || kinds_of_coins === 0) {
			return 0;
		}

		return (
			cc(amount, kinds_of_coins - 1) +
			cc(amount - first_denomination(kinds_of_coins), kinds_of_coins)
		);
	}

	return cc(amount, 5);
}

// f(4)
// n < 3 false
// f(4 - 1) + 2 * 2 + 3 * 1
// f(3)
// n < 3 false
// 2 + 1 * 2 + 3 * 1 + 2 * 2 + 3 * 1
// f(3)  = 2 + 2 + 0
export function f1_11_rec(n) {
	function f(n) {
		if (n < 3) {
			return n;
		}

		return f(n - 1) + 2 * f(n - 2) + 3 * f(n - 3);
	}

	return f(n);
}

export function f1_11_iter(n) {
	if (n < 3) {
		return n;
	}

	function f_iter(a, b, c, count) {
		let a_iter = a;
		let b_iter = b;
		let c_iter = c;

		let count_aux = count;

		while (count_aux > 0) {
			const tmp_a = a_iter;
			// 2 + 2 * 1 + 3 * 0
			a_iter = tmp_a + 2 * b_iter + 3 * c_iter;
			c_iter = b_iter;
			b_iter = tmp_a;

			--count_aux;
		}

		return a_iter;
	}

	return f_iter(2, 1, 0, n - 2);
}

// [1]
// [1, 1]
// [1, 2, 1]
// [1, 3, 3, 1]
// [1, 4, 6, 4, 1]
// ...
export function pascal_triangle(depth) {
	function pascal(triangle, depth) {
		if (depth < 2) {
			return triangle;
		}

        // get previous row in a triangle
		const prev = triangle[triangle.length - 1];
        // rows start with 1
		const cur = [1];

        // calculate the middle
		for (let i = 1; i < prev.length; ++i) {
			cur[i] = prev[i] + prev[i - 1];
		}

        // rows end with 1
        cur.push(1)
		triangle.push(cur);

		return pascal(triangle, depth - 1);
	}

	return pascal([[1]], depth);
}
