

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    // 这里, 如果 同时设置了, openfile 和opeinDirectory 只有后者起作用
    properties: ['openFile', 'openDirectory'],
    filters: [{ extensions: ['xlsx', 'xls'], name: 'Excel' }]
  }, function (files) {
    if (files) event.sender.send('selected-directory', files)
  })
})
