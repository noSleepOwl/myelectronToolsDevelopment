var $ = require('jquery');

const ipc = require('electron').ipcRenderer;

module.exports = function (ele, func) {
    $(ele).click(function () {
        ipc.send('open-file-dialog')
    });
    if (func && typeof func === 'function') {
        ipc.on('selected-directory', function (event, path) {
            func(ele, path, event);
        })
    }
}