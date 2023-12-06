const fs = require("fs");

const fileContent = fs.readFileSync('./aoc-day-1/javascript/input.txt', "utf-8");

const lines = fileContent.split('\n');

const processLine = (line) => {
    const numbers = line.split("").map(Number).filter(Boolean);
    return numbers[0] * 10 + numbers[numbers.length - 1];
}

const results = lines.map(processLine);

const finalResult = results.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(finalResult)