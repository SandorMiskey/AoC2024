// read input file {{{

const input = 'input.txt';
const grid = (await Deno.readTextFile(input)).trim().split('\n');
const rows = grid.length;
const cols = grid[0].length;

// }}}
// part one {{{

const pattern = 'XMAS';
let count = 0;

// iterate through every letter in the grid 
for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {

        // iterate through every direction
        for (const [dx, dy] of [
            [-1, -1],
            [-1, 1],
            [-1, 0],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ]) {
            let matched = true;

            // iterate through every letter in the pattern
            for (let i = 0; i < pattern.length; i++) {
                const nx = x + i * dx;
                const ny = y + i * dy;

                // check if the pattern is out of bounds or doesn't match
                if (
                    nx < 0 ||
                    ny < 0 ||
                    nx >= rows ||
                    ny >= cols ||
                    grid[nx][ny] !== pattern[i]
                ) {
                    matched = false;
                    break;
                }
            }

            // match found
            if (matched) {
                count++;
            }
        }
    }
}

console.log(`'${pattern}' appears ${count} times`);

// }}}
// part two {{{

// reset counter
count = 0;

// iterate through every letter in the grid, beginning from the second row and column
for (let x = 1; x < rows - 1; x++) {
    for (let y = 1; y < cols - 1; y++) {

        // check for an A
        if (
            grid[x][y] === 'A'
        ) {
            let bsMatch= 0;
            let fsMatch= 0;

            // \ match
            if (grid[x - 1][y - 1] === 'M' && grid[x + 1][y + 1] === 'S') { bsMatch++; }
            if (grid[x - 1][y - 1] === 'S' && grid[x + 1][y + 1] === 'M') { bsMatch++; }

            // / match
            if (grid[x - 1][y + 1] === 'M' && grid[x + 1][y - 1] === 'S') { fsMatch++; }
            if (grid[x - 1][y + 1] === 'S' && grid[x + 1][y - 1] === 'M') { fsMatch++; }

            count += bsMatch * fsMatch;
        }
    }
}

console.log(`X pattern appears ${count} times`);

// }}}

