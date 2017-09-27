
const table = require('./htmlFunc/DataTable');
const DataFormat = require('./DataFormat');

function getMaxLen(sheet) {
    let maxLen = 0;
    sheet.forEach(row => {
        let curLen = row.length;
        if (curLen > maxLen) {
            maxLen = curLen;
        }
    });
    return maxLen;
}

function getWidth(max, cur) {
    let all = parseInt(max / cur);
    let y = max % cur
    all = Array.apply(null, Array(cur)).map(() => all);
    let allLen = all.length;
    while (y !== 0) {
        allLen--;
        if (allLen <= 0) {
            allLen = all.length - 1;
        }
        all[allLen]++;
        y--;
    }
    return all;
}

module.exports = function (datas) {
    let length = datas.length;
    let tables = [];
    datas.forEach(sheet => {
        let maxLen = getMaxLen(sheet),
            rowCount = sheet.length,
            nTable = table();
        //标记当前所在的行的位置
        let rowIndex = 0;
        sheet.forEach(row => {
            // console.log(rowLen);
            row = DataFormat(row, rowIndex, rowCount)
            let rowLen = $('td', row).length;
            rowIndex++;
            if (maxLen % rowLen == 0 && rowLen !== 1) {
                nTable.appendData(row);
            } else {
                let fit = getWidth(maxLen, rowLen);
                $('td', row).each(function (index) {
                    $(this).attr('colspan', fit[index]);
                })
                nTable.appendData(row);
            }
        });
        tables.push(nTable);
    });
    return tables;
}