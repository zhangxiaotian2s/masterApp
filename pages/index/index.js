//index.js
//获取应用实例
import { indexNav,bannerCfg } from './data/index.data.js';

var app = getApp()
Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {}

    bannerCfg:bannerCfg,
    index_list:indexNav
  
  },
 
 bindNavigateTo:function(e){
  let url=e.currentTarget.dataset.locationPath
   wx.navigateTo({
     url: url,
     success: function(res){
       // success
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   })
   console.log(url)
 }
})
