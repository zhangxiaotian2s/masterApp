// pages/newmedia/template/newslist.template.js
Page({
  data:{
     bool_show_btn:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
  }

})