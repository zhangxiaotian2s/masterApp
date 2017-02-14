//这个文件用来放一些全局的服务
import { PAGE_DATA } from '../config.js';
import { Storage } from '../utils/base.js';

class login {
  constructor() {
    this.login_api = PAGE_DATA.ROOT_API + PAGE_DATA.API.LOGIN;
    this.check_login_api = PAGE_DATA.ROOT_API + PAGE_DATA.API.CHECKLOGIN;
  }
  //获取用户信息  先 wx.login 后wx.getUserInfo 然后self.userLogin()
  getUserInfo() {
    let self = this;
    wx.login({
      success: function (res1) {
        wx.getUserInfo({
          success: function (res2) {
            // console.log(res1)
            // console.log(res2)
            self.userLogin({
              code: res1.code,
              data: res2.encryptedData,
              iv: res2.iv
            })
          }
        })
      }
    })
  };
  //传参请求登陆
  userLogin(data) {
    let self = this;
    wx.request({
      url: self.login_api,
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          self.saveUserInfo(res.data.data)
        }
        // success
      },
      fail: function () {
        // fail
        console.log('登陆fial')
      },
      complete: function () {
        // complete
      }
    })
  };
  //存贮用户信息
  saveUserInfo(data) {

    //uuid 和token 单独存贮
    Storage.Set('user_uuid', data.uuid, false);
    Storage.Set('token', data.token, false);
    //一并存储
    Storage.Set('user_info', data);

  }
  //检测用户是否登陆信息是否有效
  checkLogin() {
    let self = this;
    let _user_uuid = Storage.Get('user_uuid');
    let _token = Storage.Get('token');
    wx.request({
      url: self.check_login_api,
      data: {
        user_uuid: _user_uuid,
        token: _token
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        if (res.data.code === 401) self.getUserInfo();
        // success
      },
      fail: function () {
         self.getUserInfo()
        // fail
      }
    })
  }
}
class ajax{
   constructor() {
        this.ROOT_API = PAGE_DATA.ROOT_API;
    };

     getData(url, data, success, fail, complete) {
       console.log(this.ROOT_API + url)
        wx.request({
            url: this.ROOT_API + url,
            data: data,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                success(res)
            },
            fail:function(){
                if (fail) {
                    fail()
                }
            },
            complete:function(){
                if (complete) {
                    complete()
                }
            }
        })
    };
    postData(url, data, success, fail, complete) {
        wx.request({
            url: this.ROOT_API + url,
            data: data,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                success(res)
            },
            fail:function(){
                if (fail) {
                    fail()
                }
            },
            complete:function(){
                if (complete) {
                    complete()
                }
            }
        })
    }
}

let Login = new login()
let Ajax=new ajax()
export { Login ,Ajax}