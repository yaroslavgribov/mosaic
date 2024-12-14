import path from "node:path";
import fs from "fs-extra";
import { glob } from "glob";

const [srcRoot, dstRoot] = process.argv.slice(2);

if (!srcRoot || !dstRoot) {
    throw new Error(`
        Please provide a source and a destination. Example: "node copy_files.js node_modules/ /tmp/out/"
    `)
}

glob(`${srcRoot}/**/*.*`, { ignore: "*. bck " }, (err, files) => {
	if (err) {
		console.log(err);
	} else {
		for (const srcName of files) {
			fs.stat(srcName, (err, stats) => {
				if (err) {
					console.error(err);
				} else if (stats.isFile()) {
					const dstName = srcName.replace(srcRoot, dstRoot);
					const dstDir = path.dirname(dstName);
					fs.ensureDir(dstDir, (err) => {
						if (err) {
							console.error(err);
						} else {
							fs.copy(srcName, dstName, (err) => {
								if (err) {
									console.error(err);
								}
							});
						}
					});
				}
			});
		}
	}
});
