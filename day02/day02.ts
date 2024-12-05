#!/usr/bin/env deno --allow-read

// import deno functions {{{

import { readLines } from "https://deno.land/std@0.206.0/io/read_lines.ts";
import { ensureFile } from "https://deno.land/std@0.206.0/fs/ensure_file.ts";

// }}}
// open file {{{

const inputFile = "input.txt";
await ensureFile(inputFile);
const file = await Deno.open(inputFile, { read: true });

// }}}
// check if report is safe {{{

function isSafe(fields: number[]): boolean {
    // check if the line has at least two fields
    if (fields.length < 2) {
      return false;
    }

    // check if all differences are within the range 1..3
    for (let i = 1; i < fields.length; i++) {
        const diff = Math.abs(fields[i] - fields[i - 1]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    // check if report is all increasing or all decreasing
    const isInc = fields.every((val, idx) => idx === 0 || val > fields[idx - 1]);
    const isDec = fields.every((val, idx) => idx === 0 || val < fields[idx - 1]);

    return isInc || isDec;
}

// }}}
// check if report is almost safe {{{

function isOk(fields: number[]): boolean {
    for (let i = 0; i < fields.length; i++) {
        const modedFields = fields.slice(0, i).concat(fields.slice(i + 1));
        if (isSafe(modedFields)) {
            return true;
        }
    }
    return false;
}

// }}}
// read and parse the file line by line {{{

let countSafe = 0;
let countOk = 0;

try {
  for await (const line of readLines(file)) {

    // check if the line contains only numbers
    if (!/^\s*[\d\s]+$/.test(line)) {
      console.warn(`skipping invalid line: "${line}"`);
      continue;
    }

    // parse the line into fields
    const fields = line.trim().split(/\s+/).map(Number);

    // check if report is safe
    if (isSafe(fields)) {
      countSafe++;
    } else if (isOk(fields)) {
      countOk++;
    }

  }
} catch (error) {
  console.error(`oh nooo, something bad happened: ${error.message} (errors as values are always cleaner and safer than exceptions as control flow mechanisms)`);
  file.close();
  Deno.exit(1);
} finally {
  file.close();
}

// }}}
// print the result {{{

console.log(`the number of safe reports is: ${countSafe}`);
console.log(`the number of almost safe reports is: ${countOk}`);
console.log(`the total of safe and ok is: ${countSafe + countOk}`);

// }}}

