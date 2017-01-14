import { PAGE_DATA } from '../../config.js';

class newsService {
    constructor() {
        this.ROOT_API = PAGE_DATA.ROOT_API;
    };

    getData(url, data, success, fail, complete) {
        let _data={};
        if(data&&data.channel_uuid) _data.channel_uuid=data.channel_uuid;
        if(data&&data.last_request_uuid) _data.last_request_uuid=data.last_request_uuid;
        wx.request({
            url: this.ROOT_API + url,
            data: _data,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                success(res)
            },
            fail: function () {
                if (fail) {
                    fail()
                }
            },
            complete: function () {
                if (complete) {
                    complete()
                }
            }
        })
    }
}
var NewsService = new newsService();
export { NewsService }