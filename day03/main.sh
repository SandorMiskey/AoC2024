#!/bin/sh
grep -oE 'mul\([0-9]{1,3},[0-9]{1,3}\)' input.txt | sed 's/mul(//;s/)//' | awk -F',' '{sum += $1 * $2} END {print sum}'
perl -0777 -ne '$s=1;$t=0;while(/(do\(\)|don'\''t\(\)|mul\((\d{1,3}),(\d{1,3})\))/g){if($1 eq "do()"){$s=1}elsif($1 eq "don'\''t()"){$s=0}elsif($s){$t+=$2*$3}}END{print"$t\n"}' input.txt

