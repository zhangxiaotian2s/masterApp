// pages/newmedia/news-index.js
import { AppToash } from '../config.js';
import { NewsService } from 'service/newmedia.service.js';

Page({
  data: {
    articals: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let self = this;
    //loading 
      AppToash.loading();
    //设置当前页面标题
    wx.setNavigationBarTitle({
      title: '大师头条',       
    });
    wx.request({
      url: NewsService.api(),
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
       if(res.data.code===10000){
         self.setData({
           articals:res.data.data
         })
       }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
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
  onUnload: function () {
    // 页面关闭
  },
  getNewsList:function(){

  }


})