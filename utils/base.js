class appToash {
    constructor() {
        this.text_loading = "加载中...";
        this.time_duration = 10000;
        this.time_close = 0;

        this.title = "提示";
        this.showCancel = true;
        this.cancelText = "取消";
        this.cancelColor = "#000000";
        this.confirmText = "确定";
        this.confirmColor = "#3CC51F";
    }
    //等待提示
    loading(text) {
        let self = this;
        let _text = text || self.text_loading
        wx.showToast({
            title: _text,
            icon: 'loading',
            duration: self.time_duration
        })
    }
    //成功提示
    success(text) {
        let self = this;
        wx.showToast({
            title: text||'成功',
            icon: 'success',
            duration: self.time_duration
        })
    }
    //关闭方法
    close(time) {
        let self = this;
        let _time = time || self.time_close;
        setTimeout(function () {
            wx.hideToast();
        }, _time)
    };
    //文本提示
    showModal(mesjson, success, cancel) {
        let self = this;
        let _title = mesjson.title || self.title;
        let _content = mesjson.content;
        let _confirmText = mesjson.confirmText || self.confirmText;
        let _cancelText = mesjson.cancelText || self.cancelText;
        let _confirmColor = mesjson.confirmColor || self.confirmColor;
        let _cancelColor = mesjson.cancelColor || self.cancelColor;
        wx.showModal({
            title: _title,
            content: _content,
            confirmText: _confirmText,
            cancelText: _cancelText,
            confirmColor: _confirmColor,
            cancelColor: _cancelColor,
            success: function (res) {
                if (res.confirm) {
                    if (success) success()
                } else {
                    if (cancel) cancel()
                }
            }
        })
    };
    //​显示操作菜单 itemList: ['A', 'B', 'C'],
    showActionSheet(itemList, success) {
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                console.log(res)
                if (success) success(res);
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    };
};
class AppPage {
    static setTitle(title) {
        wx.setNavigationBarTitle({
            title: title
        })
    }
};
// 对微信自带的本地存储的封装
class Storage {
    //存贮
    static Set(key, data, bool_sync, success, fail, complete) {
        let _bool_sync = bool_sync || true;
        if (_bool_sync) {
            wx.setStorageSync(key, data);
        } else {
            wx.setStorage({
                key: key,
                data: data,
                success: function (res) {
                    // success
                    if (success) success();
                },
                fail: function () {
                    // fail
                    if (fail) fail();
                },
                complete: function () {
                    // complete
                    if (complete) complete();
                }
            })
        }
    };
    //获取
    static Get(key, bool_sync, success, fail, complete) {
        let _bool_sync = bool_sync || true;
        if (_bool_sync) {
            return wx.getStorageSync(key)
        }
        else {
            return wx.getStorage({
                key: key,
                success: function (res) {
                    // success
                    if (success) success();
                },
                fail: function () {
                    // fail
                    if (fail) fail();
                },
                complete: function () {
                    // complete
                    if (complete) complete();
                }
            })
        }
    };
    //删除
    static Reomve(key, bool_sync, success, fail, complete) {
        let _bool_sync = bool_sync || true;
        if (_bool_sync) {
            wx.removeStorageSync(key)
        }
        else {
            wx.removeStorage({
                key: key,
                success: function (res) {
                    // success
                    if (success) success();
                },
                fail: function () {
                    // fail
                    if (fail) fail();
                },
                complete: function () {
                    // complete
                    if (complete) complete();
                }
            })
        }
    };
    //清除
    static Clear(bool_sync) {
        let _bool_sync = bool_sync || true;
        if (_bool_sync) {
            wx.clearStorageSync()
        } else {
            wx.clearStorage()
        }
    }
};

let AppToash = new appToash();
// let AppPage;
export { AppToash, AppPage, Storage }