// pages/newmedia/news-index.js
import { AppToash } from '../base.js';
import { API } from 'config/config.js';
import { NewsService } from 'service/newmedia.service.js';

Page({
  data: {
    articals: [],

    refreshing: true,//是否在刷新中 
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

  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh (){
    let self = this;
    self.getNewsList('',()=> wx.stopPullDownRefresh())
  },

  //存储新闻的数据列表
  arry_articals_list: [],
  last_request_uuid: '',
  //带参数的时候获取方法
  getNewsListNext(last_request_uuid, channel_uuid) {
    //获取新闻列表数据
    let self = this;
    let _data = {
      channel_uuid: '' || channel_uuid,
      last_request_uuid: '' || last_request_uuid
    }
    self.getNewsList(_data)
  },
  //获取新闻列表
  getNewsList(data,callback) {
    let self = this;
    NewsService.getData(API.NEWSLIST, data, function (res) {
      if (res.data.code === 10000) {
        console.log(res.data.data)
        res.data.data.map((index) => self.arry_articals_list.push(index));
        self.last_request_uuid = res.data.data[res.data.data.length - 1].uuid;
        self.setData({
          articals: self.arry_articals_list,
          last_uuid: self.last_request_uuid
        })
        if(callback){
          callback()
        }
      }
    })
  }



})