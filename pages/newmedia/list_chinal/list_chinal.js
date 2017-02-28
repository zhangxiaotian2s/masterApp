// pages/newmedia/list_chinal/index.js
import { NewList } from '../service/newslist.service.js';
Page({
  data: {},
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady() {
    // 页面渲染完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面关闭
  },
  bindconfirmFn(e) {
    let self = this;
    console.log(e)
    if (e.detail.value === "") return;
    else {
      // self.searchNewsConent(e.detail.value)
      wx.navigateTo({
        url: '../list_search/list_search?keywords=' + e.detail.value
      })
    }
  },
  bindTapNavigateTo(e) {
    console.log(e.target.dataset.chinalUuid)
    wx.navigateTo({
      url: '../list_all/list_all?keywords=' + e.target.dataset.chinalUuid + '&title=' + e.target.dataset.chinalTitle
    })
  },
  //weui 处理搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }

})