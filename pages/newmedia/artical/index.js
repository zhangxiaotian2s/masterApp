import { AppToash, AppPage } from '../../base.js';
import { API } from '../config/config.js';
import { NewsService } from '../service/newmedia.service.js';

Page({
  data: {
    news: {}
  },
  onLoad(options) {
    // 生命周期函数--监听页面加载
    console.log(options)
    let self = this;
    if (options.uuid) self.data_news.uuid = options.uuid;
    if (options.user_uuid) self.data_news.user_uuid = options.user_uuid;
    self.getNewsContentFirst()


  },
  onReady() {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow() {
    // 生命周期函数--监听页面显示

  },
  onHide() {
    // 生命周期函数--监听页面隐藏

  },
  onUnload() {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom() {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  data_news: {
    uuid: '',
    user_uuid: ''
  },
  getNewsContentFirst() {
    let self = this;
    self.getNewsContent({
      uuid: self.data_news.uuid,
      user_uuid: self.data_news.user_uuid
    }, function (res) {
      console.log(res.data.data)
      if (res.data.code === 10000) {
        self.setData({
          news: res.data.data
        })
      }
    });
  },
  getNewsContent(data, callBackSuccess) {
    let self = this;
    let _data = {}
    if (data && data.uuid) _data.uuid = data.uuid;
    if (data && data.user_uuid) _data.user_uuid = data.user_uuid;
    NewsService.getData(API.NEWSCONTENT, _data, function (res) {
      if (callBackSuccess)
        callBackSuccess(res)
    })
  }
})