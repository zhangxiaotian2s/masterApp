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
    loading(text) {
        let self = this;
        let _text=text||self.text_loading
        wx.showToast({
            title: _text,
            icon: 'loading',
            duration: self.time_duration
        })
    }
    success() {
        let self = this;
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: self.time_duration
        })
    }
    close(time) {
        let self = this;
        let _time = time || self.time_close;
        setTimeout(function () {
            wx.hideToast();
        }, _time)
    }
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
    }
    showActionSheet(itemList,success) {
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                console.log(res)
                if(success) success(res);
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    }
}
class AppPage{
      
}


const AppToash = new appToash();
export { AppToash,AppPage }