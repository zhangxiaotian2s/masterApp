// pages/newmedia/artical_comments/index.js
import { AppToash, AppPage } from '../../../utils/base.js';
import { Time } from '../../../utils/util.js';
import { PAGE_DATA } from '../../../config.js';
import { ArtiaclService } from '../service/newmedia.service.js';
import { Ajax } from '../../../service/service.js';
import { Storage } from '../../../utils/base.js';
Page({
  data: {
    bool_disabled: true,
    text_mesage: '',
    article_uuid: '',
    data_comments: ''
  },
  onLoad: function (options) {
    let self = this;
    console.log(options)
    self.setData({
      article_uuid: options.uuid
    })
    self.getCommentsListFirst();
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
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
   onPullDownRefresh() {
    // 页面相关事件处理函数--监听用户下拉动作
    //终止刷新
    wx.stopPullDownRefresh()

  },
  getCommentsListFirst() {
    let self = this;
    self.getCommentsList({
      article_uuid: self.data.article_uuid
    })
  },
  getCommentsList(data) {
    AppToash.loading()
    let self = this;
    ArtiaclService.getCommentsList(data, function (res) {
      if (res.data.code === 10000) {
        AppToash.close()
        let _data = res.data.data
        console.log(_data)
        _data.forEach((item) => {
          item.created_at = Time.formatTime(item.created_at)
        })
        self.setData({
          data_comments: _data
        })
        console.log(_data)
      }
    })
  },
  //留言的系列操作
  bindInputFn(e) {
    let self = this;
    console.log(e)
    if (e.detail.value !== "" && self.data.bool_disabled === true) {
      self.setData({
        bool_disabled: false
      })
    }
  },
  bindBlurFn(e) {
    let self = this;
    if (e.detail.value !== "") {
      self.setData({
        bool_disabled: false,
        text_mesage: e.detail.value
      })
    } else {
      self.setData({
        bool_disabled: true
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
         self.getCommentsListFirst();
        self.setData({
          bool_disabled: true,
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