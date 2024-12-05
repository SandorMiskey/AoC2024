// packages {{{

package main

import (
	"bufio"
	"log"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

// }}}

func main() {

	// open the file {{{

	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// }}}
	// read and parse the file line by line into lists {{{

	var leftList, rightList []int
	var scanner *bufio.Scanner

	scanner = bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		fields := strings.Fields(line)
		if len(fields) >= 2 {
			left, err1 := strconv.Atoi(fields[0])
			right, err2 := strconv.Atoi(fields[1])
			if err1 == nil && err2 == nil {
				leftList = append(leftList, left)
				rightList = append(rightList, right)
			}
		}
	}

	// }}}
	// check for errors {{{

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	if len(leftList) != len(rightList) {
		log.Fatal("lists are not of the same length")
	}

	log.Println("the total length of the two lists: ", len(leftList), len(rightList))

	// }}}
	// calculate the total distance {{{

	sort.Ints(leftList)
	sort.Ints(rightList)

	dist := 0
	for i := 0; i < len(leftList); i++ {
		dist += int(math.Abs(float64(leftList[i] - rightList[i])))
	}
	log.Println("the total distance between the two lists is: ", dist)

	// }}}
	// calculate the similarity score {{{

	count := make(map[int]int)
	for _, num := range rightList {
		count[num]++
	}

	similarity := 0
	for _, num := range leftList {
		similarity += num * count[num]
	}
	log.Println("the similarity score is: ", similarity)

	// }}}

}
