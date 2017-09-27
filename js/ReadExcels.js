const path = require('path');
const glob = require('glob');
const ParseExcel = require('./ParseExcel');


module.exports = function (dir) {
    let res = [];
    let files = glob.sync(path.join(dir, '**{.xls,xlsx}'))
    files.forEach(function (element) {
        res.push(ParseExcel(element).getAllRows());
    });
    return res;
}