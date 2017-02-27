// pages/newmedia/news-index.js
import { AppToash, AppPage } from '../../../utils/base.js';
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
    console.log(options)
    //添加loading
    AppToash.loading();
    //获取新闻列表数据
    let _data = {
      keywords: options.keywords
    }
    NewList.searchNewsList(_data, function (res) {
      AppToash.close();
      console.log(res.data.data)
       let _articals=res.data.data.slice(0, 20)
       console.log(_articals)
      self.setData({
        articals: _articals
      })
    })
  },
  onReady() {
    // 页面渲染完成
    var self = this;
  
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



})