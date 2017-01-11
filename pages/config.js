const PAGE_DATA = {
    ROOT_API: 'http://api.mastergolf.cn/'
}
class appToash {
    constructor() {
        this.text_loading = "加载中...";
        this.time_duration = 10000;
        this.time_close=0;
    }
    loading() {
        let self = this;
        wx.showToast({
            title: self.text_loading,
            icon: 'loading',
            duration: self.time_duration
        })
    }
    close(time) {
        let self = this;
        let _time= time | self.time_close;
        setTimeout(function () {
            wx.hideToast();
        }, _time)
    }

}
const AppToash = new appToash();

export { PAGE_DATA, AppToash }