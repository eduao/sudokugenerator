
function shuffleArray(numbers) {
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
    }

    return numbers;
}

function calculateMin(value, length) {
    return value - (value % length)
}

function calculateMax(value, length) {
    return calculateMin(value, length) + length - 1;
}

function generateArray(min, max) {
    let arr = []
    for (; min <= max; min++) {
        arr.push(min);
    }
    return arr;
}

function updateCurrentQuadrant(currentQuadrant, column, line) {
    let { lines } = currentQuadrant;
    const length = lines.length;

    const currentLines = generateArray(calculateMin(line, length), calculateMax(line, length))
    const currentColumns = generateArray(calculateMin(column, length), calculateMax(column, length))

    currentQuadrant.lines = currentLines
    currentQuadrant.columns = currentColumns

    return currentQuadrant
    
}

function canInSameColumn(currentValidNumberToInsert, finalSudoku, column, line) {

    for(let l = 0; l<9; l++) {
        if (l === line || finalSudoku[column] === undefined || finalSudoku[column][l] === undefined) {
            continue;
        }

        if (finalSudoku[column][l] == currentValidNumberToInsert) {
            return false;
        }
    }

    return true;
}

function canInSameLine(currentValidNumberToInsert, finalSudoku, column, line) {
    for(let c = 0; c<9; c++) {
        if (c === column || finalSudoku[c] === undefined || finalSudoku[c][line] === undefined) {
            continue;
        }

        if (finalSudoku[c][line] == currentValidNumberToInsert) {
            return false;
        }
    }

    return true;
}

function canInSameQuadrant(currentValidNumberToInsert, finalSudoku, column, line, currentQuadrant) {

    const { lines, columns } = currentQuadrant;

    for ( let c in columns ) {
        for ( let l in lines ) {
            if ( ( c === column && l === line )
             || finalSudoku[c] === undefined
             || finalSudoku[c][l] === undefined
            ) {
                continue
            }

            if (finalSudoku[c][l] == currentValidNumberToInsert) {
                return false;
            }
        }
    }


    return true;
}

function canInsert(currentValidNumberToInsert, finalSudoku, column, line, currentQuadrant) {

    return canInSameColumn(currentValidNumberToInsert, finalSudoku, column, line)
        && canInSameLine(currentValidNumberToInsert, finalSudoku, column, line)
        && canInSameQuadrant(currentValidNumberToInsert, finalSudoku, column, line, currentQuadrant)

}

function generateNumber() {
    return Math.floor(Math.random() * 9) + 1
}

function insertNumbers(currentQuadrant, validNumbers, all) {

    const {lines, columns} = all;

    const finalSudoku = [];

    for (let column in columns) {

        for ( let line in lines) {
            currentQuadrant = updateCurrentQuadrant(currentQuadrant, column, line)

           
            let currentValidNumberToInsert = generateNumber();

            if (currentValidNumberToInsert === undefined) {
                throw Error('pqp manin')
            }


            if (!canInsert(currentValidNumberToInsert, finalSudoku, column, line, currentQuadrant)) {
                const auxiliarNumbers = [];
                console.log(currentValidNumberToInsert)
                console.table(finalSudoku)
                // return
                do {
                    do {
                        currentValidNumberToInsert = generateNumber();
                    } while ((auxiliarNumbers.includes(currentValidNumberToInsert)))
                    
                    auxiliarNumbers.push(currentValidNumberToInsert)
                    // currentValidNumberToInsert = generateNumber();
                    
                } while (!canInsert(currentValidNumberToInsert, finalSudoku, column, line, currentQuadrant) && auxiliarNumbers.length !== 9)

                if (auxiliarNumbers.length == 9 ) {
                    throw Error('ja possui ' + auxiliarNumbers)
                }
                // currentNumbersToInsert.concat(auxiliarNumbers)
                
            }

            if (finalSudoku[column] === undefined) {
                finalSudoku[column] = []
            }

            finalSudoku[column][line] = currentValidNumberToInsert

        }
        
    }

    const sudoku = []
    for (let column in columns) {
        for (let line in lines) {
            if (sudoku[column] === undefined) {
                sudoku[column] = []
            }

            sudoku[column][line] = finalSudoku[line][column]
        }
    }

    console.table(sudoku)
}

/**
 * [1,2,3,  4,5,6,  7,8,9]
 * [4,5,6,  7,8,9,  1,2,3]
 * [7,8,9,  1,2,3,  4,5,6]
 * 
 * 
 */
function generateTables() {

    const currentQuadrant = {
        lines: [0,1,2],
        columns: [0,1,2]
    };

    const validNumbers = [1,2,3,4,5,6,7,8,9];
   
    const lines = [0,1,2,3,4,5,6,7,8];
    const columns = [0,1,2,3,4,5,6,7,8];

    const all = {
        lines,
        columns
    }

    return insertNumbers(currentQuadrant, validNumbers, all)

    
}

function generateSudoku() {
    const tables = generateTables()
    
    console.table(tables)
}

function main() {
    generateSudoku()
}

main()