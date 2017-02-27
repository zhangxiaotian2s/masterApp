class time {
  formatTime(time) {
    let date=new Date(time*1000)
    let self = this;
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()


    return [year, month, day].map(self.formatNumber).join('-') + ' ' + [hour, minute, second].map(self.formatNumber).join(':')
  };

  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

}
let Time= new time()

export{ Time}
