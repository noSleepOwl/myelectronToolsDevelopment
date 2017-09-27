// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.jQuery = require('jquery');
const res = require('bootstrap');

const collspace = require('./htmlFunc/ExcelCollspace');

const path = require('path');
const fileDiolg = require('./file');
const ReadExcels = require('./ReadExcels');
const ParseData = require('./ParseData');

const uuidv = require('uuid/v1');




$(function () {
    fileDiolg('#testDiolg', function (ele, path, event) {
        $('#accordion').empty();
        //读取文件 
        let datas = ReadExcels(path[0]);
        let tables = ParseData(datas);
        tables.forEach(function (ele) {
            let self = ele.getTable();
            let title = self.find('[data-field="code"]').text(),
                target = uuidv(),
                parentSelector = '#accordion';
            var coll = collspace(title, target, parentSelector);
            $(parentSelector).append(coll.getCollspace());
            coll.append(self);
            // console.log(ele.haveError)
            if (ele.haveError()) {
                coll.removeClass('panel-info')
                coll.addClass('panel-danger')
            }
        })
    })
})


