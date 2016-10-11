var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/**
 * convert AA to 27
 * @param col
 * @returns {number}
 */
function colLetterToNumber(col) {
    if (col.length == 1) {
        return letters.indexOf(col) + 1;
    } else {
        return (letters.indexOf(col[0]) + 1) * 26 + (letters.indexOf(col[1]) + 1);
    }
}

/**
 * convert 27 to AA
 * @param col
 * @returns {string}
 */
function colNumberToLetter(col) {
    if (col < 27) {
        return letters[col - 1];
    } else {
        var modulos = col % 26;
        var remainder = (col - modulos) / 26;

        if (modulos == 0) {
            return letters[remainder - 2] + 'Z';
        } else {
            return letters[remainder - 1] + letters[modulos - 1];
        }

    }
}

/*
convert A1 to {row: 1, col: 1}
 */
function rowCol(cellLocation) {
    var colLetter = (/[A-Z]+/g).exec(cellLocation)[0];
    var col = parseInt(colLetterToNumber(colLetter));
    var rowLetter = (/\d+/g).exec(cellLocation)[0];
    var row = parseInt(rowLetter);

    return {
        row: row,
        col: col,
        colLetter: colLetter
    };
}

/**
 * convert row 5, col 3 to C5
 * @param row
 * @param col
 * @returns {string}
 */
function cellLocation(row, col) {

    return colNumberToLetter(col) + row;

}

module.exports.colLetterToNumber = colLetterToNumber;
module.exports.colNumberToLetter = colNumberToLetter;
module.exports.rowCol = rowCol;
module.exports.cellLocation = cellLocation;