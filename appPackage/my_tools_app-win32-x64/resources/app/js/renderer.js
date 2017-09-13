// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.jQuery = require('jquery');
let res = require('bootstrap');
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const clipboard = require('electron').clipboard;





function getClipBoard(type, message,self,arg) {
    let rea = require('./messageControl.js');
    rea[type].apply(this, [message,self].concat(arg));
}

$(function () {
    $('[data-toggle="getClipBoard"]').click(function () {
        let self = $(this),
            data = self.data(),
            type = data['type'],
            arg = data['arg'].split(','),
            message = clipboard.readText();
        getClipBoard(type, message,self,arg)
    })
})