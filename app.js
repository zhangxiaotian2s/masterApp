//app.js
import { AppToash } from 'utils/base.js';
import { Login } from 'service/service.js';
App({
  onLaunch() {
    let self = this;
    //调用API从本地缓存中获取数据
    
    //检测用户登陆状态  
    Login.checkLogin();
    
  },
 
})