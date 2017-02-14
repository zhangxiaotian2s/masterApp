import { PAGE_DATA } from '../../../config.js';
import { AppToash, AppPage } from '../../../utils/base.js';
import { Ajax} from '../../../service/service.js';

class newsList {
    constructor() {
        this.data_newslist = {
            list_data: [],
            last_request_uuid: '',
            required: true, //用来判断是否正在请求中.
        }
    }

    //带参数的时候获取方法 获取下一页
    getNewsListNext(channel_uuid, last_request_uuid, callback) {
        //获取新闻列表数据
        let self = this;
        let _data = {
            channel_uuid: '' || channel_uuid,
            last_request_uuid: '' || last_request_uuid
        }

        self.getNewsList(_data, function (res) {
            if (res.data.code === 10000) {
                res.data.data.forEach((index) => self.data_newslist.list_data.push(index));
                if (callback) {
                    callback(self.data_newslist.list_data)
                }
            }
        })
    }
    //获取最新新闻列表数据
    getNewsListNew(channel_uuid, callback) {
        let self = this;
        let _data = {
            channel_uuid: '' || channel_uuid,
        }
        self.getNewsList(_data, function (res) {
            self.data_newslist.list_data = [];//先要清空已经存储的数据
            res.data.data.forEach((index) => self.data_newslist.list_data.push(index))
            if (callback) {
                callback(self.data_newslist.list_data)
            }
        })

    };
    //获取新闻列表
    getNewsList(data, callBackSuccess) {
        let self = this;
        //设置 false 防止重复请求
        if (!self.data_newslist.required) return;
        self.data_newslist.required = false;
        let _data = {};
        if (data && data.channel_uuid) _data.channel_uuid = data.channel_uuid;
        if (data && data.last_request_uuid) _data.last_request_uuid = data.last_request_uuid;
        console.log(_data)
        Ajax.getData(PAGE_DATA.API.NEWSLIST, _data, function (res) {
            self.data_newslist.required = true;
            if (callBackSuccess) {
                callBackSuccess(res)
            }
        })
    }

}
let NewList = new newsList()
export { NewList }