
const $ = require('jquery')
const uuidv = require('uuid/v1');
function Table(id) {
    let table = $(`<table id="${id}" class="table table-striped  table-bordered table-hover table-condensed text-center ">
                    <tbody>
                    </tbody>
                </table>`)
    let tbody = $('tbody', table);
    return [table, tbody]
}


class TableCLass {
    constructor(id) {
        this.id = id;
        this.init();
    }
    init() {
        [this.table, this.tbody] = Table(this.id)
    }
    addData(func) {
        if (func && typeof func === 'function') {
            func(tbody);
        }
    }
    getTable() {
        return this.table;
    }
    appendData(element) {
        this.tbody.append(element);
        return this;
    }
    haveError() {
        console.log($('.danger', this.table).length)
        if ($('.danger', this.table).length > 0) {
            return true;
        }
        return false;
    }

}

module.exports = function getTable() {
    var id = uuidv();
    return new TableCLass(id);
}