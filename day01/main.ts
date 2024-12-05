// import deno functions {{{

import { readLines } from "https://deno.land/std@0.206.0/io/read_lines.ts";
import { ensureFile } from "https://deno.land/std@0.206.0/fs/ensure_file.ts";

// }}}
// read file {{{

const filename = "input.txt";
await ensureFile(filename);
const file = await Deno.open(filename, { read: true });

// }}}
// read and parse the file line by line into lists {{{

const leftList: number[] = [];
const rightList: number[] = [];

try {
  for await (const line of readLines(file)) {
    const fields = line.trim().split(/\s+/);
    if (fields.length >= 2) {
      const left = parseInt(fields[0]);
      const right = parseInt(fields[1]);
      if (!isNaN(left) && !isNaN(right)) {
        leftList.push(left);
        rightList.push(right);
      }
    }
  }
} catch (err) {
  console.error("dunno, something bad happened:", err);
  file.close();
  Deno.exit(1);
} finally {
  file.close();
}

// }}}
// check length of lists {{{

if (leftList.length !== rightList.length) {
  console.error("Lists are not of the same length.");
  Deno.exit(1);
}

console.log(`The total length of the two lists: ${leftList.length}, ${rightList.length}`);

// }}}
// calculate total distance {{{

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < leftList.length; i++) {
  totalDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log(`The total distance between the two lists is: ${totalDistance}`);

// }}}
// calculate similarity score {{{

const count: Record<number, number> = {};
for (const num of rightList) {
  count[num] = (count[num] || 0) + 1;
}

let similarityScore = 0;
for (const num of leftList) {
  similarityScore += num * (count[num] || 0);
}

console.log(`The similarity score is: ${similarityScore}`);

// }

