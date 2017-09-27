
const table = require('./htmlFunc/DataTable');


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
    let tables = $("");
    datas.forEach(sheet => {
        let element = [];
        let maxLen = getMaxLen(sheet);
        //标记当前所在的行的位置
        let currentRow = 0;
        let currentColumn = 0;
        sheet.forEach(row => {
            currentRow++;
            let rowLen = row.length;
            let trStr = '';
            if (maxLen % rowLen == 0 && rowLen !== 1) {
                trStr = `<td>${row.join('</td><td>')}</td>`
            } else {
                let rowLen = row.length;
                let fit = getWidth(maxLen, rowLen);

                for (i = 0; i < rowLen; i++) {
                    trStr += `<td colspan="${fit[i]}">${row[i]}</td>`;
                }

            }
            element.push(trStr);
        });
        element = `<tr>${element.join('</tr><tr>')}</tr>`
        tables = tables.add(table().appendData(element).getTable());
    });
    return tables;
}