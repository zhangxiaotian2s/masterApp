import { PAGE_DATA } from '../../../config.js';
import { Ajax } from '../../../service/service.js';


//文章详情页的服务
class artiaclService {
    //整合文章的富文本结构
    constructor() {

    }
    integrationHtml(data) {
        let _html = '';
        console.log(data)
        data.pop();
        data.pop();
        data.forEach((item) => {
            if (item.type == 'text') _html += item.content;
            if (item.type === 'image') _html += `<div><img src="` + item.url + `" alt=""></div>`;
            if (item.type === 'video') _html += `<video src="` + item.url + `"></video>`;
        });
        return _html;
    }
    getArticalContent(data, callBackSuccess) {
        Ajax.getData(PAGE_DATA.API.NEWSCONTENT, data, function (res) {
            if (callBackSuccess)
                callBackSuccess(res)
        })
    }
    addComment(data,callBackSuccess) {
        Ajax.postData(PAGE_DATA.API.ADDCOMMENT, data, function (res) {
            if (callBackSuccess) callBackSuccess(res);
        })
    }
    getCommentsList(data,callBackSuccess){
        Ajax.getData(PAGE_DATA.API.COMMENTS,data,function(res){
             if (callBackSuccess) callBackSuccess(res);
        })
    }
}
let ArtiaclService = new artiaclService();
// let NewsService = new newsService();
export { ArtiaclService }