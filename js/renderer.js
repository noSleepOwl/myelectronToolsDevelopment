// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.jQuery = require('jquery');
let res = require('bootstrap');
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const clipboard = require('electron').clipboard;


const pasteBtn = document.getElementById('paste-to')

pasteBtn.addEventListener('click', function () {
  clipboard.writeText('What a demo!')
  const message = `Clipboard contents: ${clipboard.readText()}`
  document.getElementById('paste-from').innerHTML = message
})

const TYPE  = ['FORMATTIME']

function getClipBoard (type){
    switch(type){
        case TYPE[0]:
            break;
        case '':
            break;
        default:
            break;
    }
}

$(function () {
    $('[data-toggle="getClipBoard"]').click(function(){
        let self = $(this),
            data = self.data(),
            type = data['type']
            getClipBoard(type)
    })
})