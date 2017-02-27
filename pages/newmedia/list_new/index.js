// pages/newmedia/news-index.js
import { AppToash, AppPage } from '../../../utils/base.js';
import { PAGE_DATA } from '../../../config.js';
import { NewList } from '../service/newslist.service.js';

Page({
  data: {
    articals: [],
  },
  onShareAppMessage() {
    return {
      title: '佰佳高尔夫新闻',
      desc: '佰佳高尔夫带给你最新最全的高尔夫新闻资讯',
      path: '/pages/newmeadia/list_new/index'
    }
  },
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let self = this;
    //添加loading
    AppToash.loading();
    //获取新闻列表数据
    NewList.getNewsListNew(self.page_data.chinal_uuid, function (data) {
      self.setData({
        articals: data
      })
      self.page_data.last_request_uuid = data[data.length - 1].uuid;
    })
  },
  onReady() {
    // 页面渲染完成
    var self = this;
    AppToash.close();
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh() {
    let self = this;
    NewList.getNewsListNew(self.page_data.chinal_uuid, function (data) {
      self.page_data.last_request_uuid = data[data.length - 1].uuid;
      self.setData({
        articals: data
      });
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    //底部触控事件
    console.log('底部触发')
    let self = this;
    if (self.page_data.bool_list_is_end) return;
    NewList.getNewsListNext(self.page_data.chinal_uuid, self.page_data.last_request_uuid, function (data) {
      if (data[data.length - 1].uuid === self.page_data.last_request_uuid) {
        self.page_data.bool_list_is_end = true;
        return
      } else {
        self.page_data.last_request_uuid = data[data.length - 1].uuid;
      }

      self.setData({
        articals: data
      })


    })
  },
  page_data: {
    chinal_uuid: '',
    data_list: '',
    last_request_uuid: "",
    bool_list_is_end: false
  }
})