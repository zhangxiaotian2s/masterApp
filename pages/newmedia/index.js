// pages/newmedia/news-index.js
import { AppToash, AppPage } from '../base.js';
import { API } from 'config/config.js';
import { NewsService } from 'service/newmedia.service.js';

Page({
  data: {
    articals: [],
  },
  onShareAppMessage() {
    return {
      title: '佰佳高尔夫新闻',
      desc: '佰佳高尔夫带给你最新最全的高尔夫新闻资讯',
      path: '/pages/newmeadia/news-index'
    }
  },
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let self = this;
    //设置title
    AppPage.setTitle('大师高尔夫');
    //添加loading
    AppToash.loading();
    //获取新闻列表数据
    self.getNewsListNew();
  


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
    self.getNewsListNew()
  },
  onReachBottom() {
    //底部触控事件
    console.log('xxxx')
    let self = this;
    self.getNewsListNext(self.data_newslist.last_request_uuid, self.data_newslist.channel_uuid)
  },
  //存储新闻列表的相关数据
  data_newslist: {
    list_data: [],
    last_request_uuid: '',
    channel_uuid: ''
  },
  //带参数的时候获取方法 获取下一页
  getNewsListNext(last_request_uuid, channel_uuid) {
    console.log(last_request_uuid)
    //获取新闻列表数据
    let self = this;
    let _data = {
      channel_uuid: '' || channel_uuid,
      last_request_uuid: '' || last_request_uuid
    }
    self.getNewsList(_data, function(res) {
      if (res.data.code === 10000) {
        console.log(res.data.data)
        res.data.data.forEach((index) => self.data_newslist.list_data.push(index));
        self.data_newslist.last_request_uuid = res.data.data[res.data.data.length - 1].uuid;
        self.setData({
          articals: self.data_newslist.list_data,
        })
      }
    })
  },
  //获取最新新闻列表数据
  getNewsListNew(channel_uuid) {
    let self = this;
    let _data = {
      channel_uuid: '' || channel_uuid,
    }
    self.getNewsList(_data, function(res){
      self.data_newslist.list_data = [];//先要清空已经存储的数据
      res.data.data.forEach((index) => self.data_newslist.list_data.push(index));
      self.data_newslist.last_request_uuid = res.data.data[res.data.data.length - 1].uuid;
      self.setData({
        articals: self.data_newslist.list_data,
      })
      wx.stopPullDownRefresh()
    }
    )
  },
  //获取新闻列表
  getNewsList(data, callBackSuccess) {
    let self = this;
    let _data = {};
    if (data && data.channel_uuid) _data.channel_uuid = data.channel_uuid;
    if (data && data.last_request_uuid) _data.last_request_uuid = data.last_request_uuid;
    NewsService.getData(API.NEWSLIST, _data, function (res) {
      if (callBackSuccess) {
        callBackSuccess(res)
      }
    })
  }



})