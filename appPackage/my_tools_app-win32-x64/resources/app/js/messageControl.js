
const $ = require('jquery')

// 获取剪贴板内容
exports.getClipBoard = function getClipBoard(message, self, select) {
    select = $(select);
    select.text(message);
}
exports.printListTable = function printListTable(message, split, select) {

}
exports.split = function split(message, self,select) {
    let fuhao = self.parent().next().val();
    message = message.split(fuhao);
    select = $(select);
    select.text(message.toString());
}
exports.message = function message(){
    
}