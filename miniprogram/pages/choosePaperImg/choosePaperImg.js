var app = getApp()

Page({
  data: {
    imgUrls: [
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/1.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/2.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/3.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/4.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/5.png",

    ],

    currentIndex: 0, // 页面swiper的current索引
    index: 0,
    flag: true
  },

  toLeft: function (e) {
    console.log(this.data.flag)
    if (!this.data.flag) { // 如果动画还未完成，不执行
      return
    } else {
      // 修改按钮切换不可用状态
      this.setData({
        flag: false
      })
      var index = this.data.index
      if (index > 0) {
        this.setData({
          currentIndex: index - 1
        })
      } else {
        this.setData({
          currentIndex: 4
        })
      }
    }
  },
  toRight: function (e) {
    console.log(this.data.flag)
    if (!this.data.flag) { // 如果动画还未完成，不执行
      return
    } else {
      // 修改按钮切换不可用状态
      this.setData({
        flag: false
      })
      var index = this.data.index
      if (index >= 4) {
        this.setData({
          currentIndex: 0
        })
      } else {
        this.setData({
          currentIndex: index + 1
        })
      }
    }
  },
  changeIndex: function (e) { // 切换过程绑定
    this.setData({
      index: e.detail.current
    })
  },
  changeFinish: function (e) { // 动画完全完成
    // 修改按钮切换可用状态
    this.setData({
      flag: true
    })
    console.log(this.data.currentIndex)

  },
  toEdit: function (opotions) {
    wx.navigateTo({
      url: '../editTextImg/editTextImg?imgUrl=' + this.data.imgUrls[this.data.currentIndex]+'&currentIndex=' + this.data.currentIndex
    })
  },

  onSwipertap: function (e) {
    console.log(e.detail.current)
  },


})