

function createRowByArr(arr, func) {
    let row = $(`<tr><td>${arr.join('</td><td>')}</td></tr>`);
    if (func && typeof func === 'function') {
        func(row)
    }
    return row;
}

function varifly(varVal, val, field, regex) {
    let reg = RegExp(regex || `^(${varVal})(.+)`)
    if (reg.test(val)) {
        return `<td class="info">${varVal}</td><td data-field="${field}">${reg.exec(val)[2]}</td>`;
    } else {
        return `<td class="info">${varVal}</td><td class="danger" data-field="${field}"></td>`;
    }
}




class Format {
    constructor(row) {
        this.row = row;
    }
    eachRow(func) {
        if (func && typeof func === 'function') {
            return func.apply(this, this.row)
        } else {
            return;
        }
    }
    format() {

    }

    getRow() {
        let rowRes = this.eachRow(this.format)
        if (rowRes) {
            return rowRes;
        } else {
            let row = this.row;
            return createRowByArr(row);
        }
    }
}

class formatTitle extends Format {

    format(title) {
        return $(`<tr class="info font-weight"><td><h5>${title}</h5></td></tr>`)
    }
}
class formatCoust extends Format {
    format() {
        let argu = [...arguments];
        if (arguments.length < 4 || arguments.length > 5) {
            return createRowByArr(argu, row => {
                row.attr('class', 'danger')
            })
        } else if (arguments.length === 4) {
            let [name, dir, date, list] = argu;
            name = varifly('客户', name, 'name');
            dir = varifly('地址', dir, 'dir');
            list = varifly('单号', list, 'code', '^(单号)：?(.+)');
            date = `<td data-field="date">${date}</td>`;
            return $(`<tr>${name}${dir}${date}${list}</tr>`)
        } else if (arguments.length === 5) {
            let [name, dir, date, list, code] = argu;
            name = varifly('客户', name, 'name');
            dir = varifly('地址', dir, 'dir');
            list = `<td class="info">${list}</td>`;
            date = `<td data-field="date">${date}</td>`;
            code = `<td data-field="code">${code}</td>`;
            return $(`<tr>${name}${dir}${date}${list}${code}</tr>`)
        }
    }

}
class formatModel extends Format {

}
class formatDataTitle extends Format {

}
class formatData extends Format {

}
class formatAreaSay extends Format {

}
class formatCount extends Format {

}
class formatSay extends Format {

}
class formatEndSay extends Format {

}

module.exports = function (row, rowIndex, rowCount) {
    if (rowIndex === 0) {
        return new formatTitle(row).getRow();
    } else if (rowIndex === 1) {
        return new formatCoust(row).getRow();
    } else if (rowIndex === 2) {
        return new formatModel(row).getRow();
    } else if (rowIndex === 3) {
        return new formatDataTitle(row).getRow();
    } else if (rowIndex > 3 && rowIndex < rowCount - 4) {
        return new formatData(row).getRow();
    } else if (rowIndex === rowCount - 4) {
        return new formatAreaSay(row).getRow();
    } else if (rowIndex === rowCount - 3) {
        return new formatCount(row).getRow();
    } else if (rowIndex === rowCount - 2) {
        return new formatSay(row).getRow();
    } else if (rowIndex === rowCount - 1) {
        return new formatEndSay(row).getRow();
    }

}