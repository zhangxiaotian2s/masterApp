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
        url: '../list_search/index?keywords='+e.detail.value
      })
    }
  },
  searchNewsConent(text) {
    let _data = {
      keywords: text
    }
    NewList.searchNewsList(_data, function (res) {
      if (res.data.code === 10000) {

      }

    })

  }
})