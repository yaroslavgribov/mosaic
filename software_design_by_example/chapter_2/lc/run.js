import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import readline from "node:readline";

async function count_lines(filename) {
	let lines = 0;
	const file_stream = createReadStream(filename);

	const rl = readline.createInterface({
		input: file_stream,
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	for await (const line of rl) {
		++lines;
	}

	return lines;
}

async function count() {
	const files = process.argv.slice(2);
	let lines = 0;

	for (const file of files) {
		const stats = await stat(file);

		if (!stats.isFile()) {
			console.log(`${file} is not a file, skipping...`);
		} else {
			const lines_n = await count_lines(file);

			console.log(`${file}: ${lines_n}`);
			lines += lines_n;
		}
	}

	console.log(`total: ${lines}`);
}

count();
