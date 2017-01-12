// pages/newmedia/news-index.js
import { AppToash } from '../base.js';
import { API } from 'config/config.js';
import { NewsService } from 'service/newmedia.service.js';

Page({
  data: {
    articals: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let self = this;
    //添加loading
    AppToash.loading()
    //获取新闻列表数据
    self.getNewsList();


  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/user?id=123'
    }
  },
  onReady: function () {
    // 页面渲染完成
    var self = this;
     AppToash.close();


  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
  onUnload: function () {
    // 页面关闭
  },
  getNewsList: function () {
    //获取新闻列表数据
    let self = this;
    NewsService.getData(API.NEWSLIST, '', function (res) {
      if (res.data.code === 10000) {
        self.setData({
          articals: res.data.data
        })
      }
    })
  }



})