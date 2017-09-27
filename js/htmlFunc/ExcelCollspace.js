
var $ = require('jquery')
const uuidv = require('uuid/v1');
// 获取 collspace 的 html 代码; 
function getCollspaceHtml(title, target, parentSelector, id) {
    let collspace = $(`<div class="panel panel-info" id="${id}">
                        <div class="panel-heading" role="tab"  >
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="${parentSelector}" href="#${target}" aria-expanded="false"
                                aria-controls="collapseTwo"> ${title} </a>
                            </h4>
                        </div>
                        <div id="${target}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                            <div class="panel-body">
                            </div>
                        </div>
                    </div>`);
    let body = $('.panel-body', collspace);
    let cpTitle = $('.collapsed', collspace);

    return [collspace, body, cpTitle];
}

class Collspace {
    constructor(title, target, parentSelector, id) {
        this.title = title;
        this.target = target;
        this.parentSelector = parentSelector;
        this.id = id;
        this.init();
    }
    init() {
        let title = this.title,
            target = this.target,
            parentSelector = this.parentSelector,
            id = this.id;
        [this.collspace, this.body, this.cpTitle] = getCollspaceHtml(title, target, parentSelector, id);
    }
    getCollspace() {
        return this.collspace;
    }
    append(element) {
        this.body.append(element);
        return this;
    }
    addClass() {
        this.collspace.addClass(...arguments)
    }
    removeClass() {
        this.collspace.removeClass(...arguments)
    }
}
// 返回一个 nodejs 的jquery 的实例  
module.exports = function (title, target, parentSelector) {
    let id = uuidv(); // 每次产生一个 uuid 进行id 的设置
    return new Collspace(title, target, parentSelector, id);
}