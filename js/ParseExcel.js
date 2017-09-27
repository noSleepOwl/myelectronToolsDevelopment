
// 一些工作表的 column
const LINE_NUMBER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function isNotEmpty(array) {
    let isNot = false;
    array.forEach(ele => {
        ele = ele || '';
        if (ele !== '') {
            isNot = true;
        }
    });
    return isNot;
}

function removeEmpty(array) {
    let nArr = [];
    array.forEach(ele => {
        ele = ele || ''
        if (ele !== '') {
            nArr.push(ele)
        }
    })
    return nArr;
}

class Model {
    constructor(path) {
        this.path = path;
        // 工作表;
        this.workbook
        this.init();
    }

    init() {
        this.workbook = this.readFile(this.path);
        //总是获取第一个 sheet
        this.sheet = this.getWorkBookByIndex();
        // 最大的列号 最大的行号
        let [maxRow, maxColumnIndex] = this.getMaxColumnAndMaxRow();
        this.maxRow = maxRow;
        this.maxColumnIndex = maxRow;

    }
    // 读取Excel
    readFile(path) {
        var XLSX = require('xlsx'),
            workbook = XLSX.readFile(path),
            data = null;
        data = workbook;
        return workbook;
    }
    getMaxColumnAndMaxRow() {

        let finallyCell = this.sheet['!ref'].split(':')[1];

        let maxColumn = finallyCell[0];

        let maxRow = parseInt(finallyCell.substring(1));

        let maxColumnIndex = parseInt(LINE_NUMBER.indexOf(maxColumn));
        return [maxRow, maxColumnIndex];
    }

    //根据 index 获取对应 sheet
    getWorkBookByIndex() {
        let names = this.workbook.SheetNames;
        return this.workbook.Sheets[names[0]];
    }
    // 获取行(根据行号)
    getRow(index) {
        let valueArray = [];
        for (let j = 0; j < this.maxColumnIndex; j++) {
            let cell = LINE_NUMBER[j] + "" + index;
            let value = this.sheet[cell]

            if (index <= 3) {
                if (value) {
                    value = value['v']
                    if (typeof value === 'string') {
                        value = value.trim();
                    }
                    valueArray.push(value);
                }
            } else if (index > 3) {
                if (value) {
                    value = value['v']
                    if (typeof value === 'string') {
                        value = value.trim();
                    }
                    valueArray.push(value);
                } else if (j <= 6) {
                    valueArray.push('');
                }
            }

        }
        if (isNotEmpty(valueArray)) {
            return valueArray;
        } else {
            return [];
        }
    }

    getAllRows() {
        let allRows = []
        for (let i = 0; i < this.maxRow; i++) {

            let arow = this.getRow(i);
            if (arow.length > 0) {
                allRows.push(arow)
            }
        }
        let allLen = allRows.length;
        for (let i = allLen - 1; i > allLen - 5; i--) {
            allRows[i] = removeEmpty(allRows[i]);
        }
        return allRows;
    }
}




module.exports = function getData(path) {
    return new Model(path);
};