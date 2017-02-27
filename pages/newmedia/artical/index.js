import { AppToash, AppPage, Storage } from '../../../utils/base.js';
import { Time } from '../../../utils/util.js';
import { PAGE_DATA } from '../../../config.js';
import { ArtiaclService } from '../service/newmedia.service.js';
import { Ajax } from '../../../service/service.js';
var WxParse = require('../../../utils/wxParse/wxParse.js');

Page({
  data: {
    news: {},
    share_img: '',
    bool_show_btn: false,
    text_mesage: '',
    article_uuid: ''
  },
  onLoad(options) {
    // 生命周期函数--监听页面加载
    console.log(options)
    let self = this;
    if (options.uuid) {
      self.setData({
        article_uuid: options.uuid
      });
      self.data_share.path = 'pages/newmedia/artical/index?uuid=' + options.uuid;
    }
    AppPage.setTitle('佰佳高尔夫');
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
    //终止刷新
    wx.stopPullDownRefresh()

  },
  onReachBottom() {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage() {
    var self = this;
    return {
      title: self.data_share.title,
      desc: self.data_share.desc,
      path: self.data_share.path
    }
  },
  data_mes: {
    bool_show_btn: false
  },
  data_share: {
    title: '',
    desc: '',
    path: ''
  },
  getNewsContentFirst() {
    let self = this;
    self.getNewsContent({
      uuid: self.data.article_uuid,
    }, function (res) {
      console.log(res.data.data)

      if (res.data.code === 10000) {
        //整合HTMLstr
        let _html = ArtiaclService.integrationHtml(res.data.data.content);

        WxParse.wxParse('article', 'html', _html, self, 5);
        self.data_share.title = res.data.data.share.title;
        self.data_share.desc = res.data.data.share.summary;

        console.log(res.data.data)

        let _data = res.data.data;
        _data.published_at = Time.formatTime(_data.published_at);
        self.setData({
          news: _data,
          share_img: res.data.data.share.image
        })
      }
    });
  },
  getNewsContent(data, callBackSuccess) {
    let self = this;
    let _data = {}
    if (data && data.uuid) _data.uuid = data.uuid;
    ArtiaclService.getArticalContent(_data, callBackSuccess)
  },
  //留言的系列操作
  bindFocusFn(e) {

  },
  bindInputFn(e) {
    let self = this;
    console.log(e)
    if (e.detail.value !== "" && self.data.bool_show_btn === false) {
      self.setData({
        bool_show_btn: true
      })
    }
  },
  bindBlurFn(e) {
    let self = this;
    if (e.detail.value !== "") {
      self.setData({
        bool_show_btn: true,
        text_mesage: e.detail.value
      })
    } else {
      self.setData({
        bool_show_btn: false
      })
    }
  },
  addCommentFn() {
    let self = this;
    AppToash.loading('提交中...')
    ArtiaclService.addComment({
      article_uuid: self.data.article_uuid,
      user_uuid: Storage.Get('user_uuid'),
      token: Storage.Get('token'),
      content: self.data.text_mesage
    }, function (res) {
      //  AppToash.close()
      console.log(res)
      if (res.data.code === 10000) {
        self.setData({
          bool_show_btn: false,
          text_mesage: ''
        })
        AppToash.success('提交成功')
        setTimeout(function () {
          AppToash.close()
        }, 1000)
      }
    })
  }
})