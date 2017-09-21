const $ = require('jquery');
const time = require('moment');
const DEFAULT_OPTION = {
    selector: '#hostoryList',
}

class Message {
    constructor(option) {
        this.option = $.extend({}, DEFAULT_OPTION, option);
        this.init();
        this.datas = [];
    }
    init() {

    }
    saveData(message) {
        var selector = $(this.option.selector);
        let date = time(new Date()).format('YYYY-MM-DD h:mm:ss');
        let messformat = `第${this.datas.length}条:${date}`;
        let data = {
            message: message,
            li: `<li class="list-group-item" data-index="${this.datas.length}" >${messformat}:${message.substring(0,20)}</li>`
        }
        this.datas.push(data)
        let noHostory = $('.no-hostory', selector);
        if (noHostory.length > 0) {
            noHostory.remove();
        }
        
        selector.append(this.bindControl($(data.li)));
    }
    bindControl (li){
        var data = this.datas;
        li.dblclick(function(){
            data[$(this).data().index] = null;
            $(this).remove()
        })
        li.click(function(){

        })
        return li;
    }
    getMessage(index) {

    }
    showNext() {

    }
    showPrev() {

    }
}

exports.message = (function () {
    var mes = new Message({});
    return mes;
})()