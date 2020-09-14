// 20200914，李铭鑫
var app = getApp()

Page({
  data: {
    imgUrls: [
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/choosePaperChooseImage1.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/choosePaperChooseImage2.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/choosePaperImg/choosePaperChooseImage1.png",




    ],

    currentIndex: 0, // 页面swiper的current索引
    index: 0,
    flag: true
  },

  toLeft: function(e) {
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
          currentIndex: 2
        })
      }
    }
  },
  toRight: function(e) {
    console.log(this.data.flag)
    if (!this.data.flag) {
      // 如果动画还未完成，不执行
      return
    } else {
      // 修改按钮切换不可用状态
      this.setData({
        flag: false
      })
      var index = this.data.index
      if (index >= 2) {
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
  changeIndex: function(e) { // 切换过程绑定
    this.setData({
      index: e.detail.current
    })
  },
  changeFinish: function(e) { // 动画完全完成
    // 修改按钮切换可用状态
    this.setData({
      flag: true
    })
  },
  toEdit: function(opotions) {
    wx.navigateTo({
      url: '../editTextImg/editTextImg'
    })
  },

  onSwipertap: function(e) {
    console.log(e.detail.current)
  },


})