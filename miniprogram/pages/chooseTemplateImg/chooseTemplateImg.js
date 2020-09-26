/* 2020.9.21 李永琦*/
var app = getApp()

Page({
  data: {

    imgUrls: [
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage1.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage2.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage3.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage4.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage5.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage6.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage7.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage8.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage9.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage10.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage11.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage12.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage13.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage14.png",
      "cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage15.png",

    ],

    currentIndex: 0, // 页面swiper的current索引
    index: 0,
    flag: true
  },

  onLoad: function (options) {
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage.png',
        success: res => {
           this.setData({
            imgUrlsFilePath0:res.tempFilePath
        })
        console.log(this.data.imgUrlsFilePath0)
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage1.png',
        success: res => {
          this.setData({
            imgUrlsFilePath1:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage2.png',
        success: res => {
          this.setData({
            imgUrlsFilePath2:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage3.png',
        success: res => {
          this.setData({
            imgUrlsFilePath3:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage4.png',
        success: res => {
          this.setData({
            imgUrlsFilePath4:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage5.png',
        success: res => {
          this.setData({
            imgUrlsFilePath5:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage6.png',
        success: res => {
          this.setData({
            imgUrlsFilePath6:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage7.png',
        success: res => {
          this.setData({
            imgUrlsFilePath7:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage8.png',
        success: res => {
          this.setData({
            imgUrlsFilePath8:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage9.png',
        success: res => {
          this.setData({
            imgUrlsFilePath9:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage10.png',
        success: res => {
          this.setData({
            imgUrlsFilePath10:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage11.png',
        success: res => {
          this.setData({
            imgUrlsFilePath11:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage12.png',
        success: res => {
          this.setData({
            imgUrlsFilePath12:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage13.png',
        success: res => {
          this.setData({
            imgUrlsFilePath13:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage14.png',
        success: res => {
          this.setData({
            imgUrlsFilePath14:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
      wx.cloud.downloadFile({
        fileID: 'cloud://bigcgraduation-20ikc.6269-bigcgraduation-20ikc-1302878587/images/chooseTemplateImg/chooseTemplateShowImage15.png',
        success: res => {
          this.setData({
            imgUrlsFilePath15:res.tempFilePath
          })
        },
        fail: err => { 
        }
      })
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
          currentIndex: 15
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
      if (index >= 15) {
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
    console.log(this.data.currentIndex)
    
  },

  toEdit: function(opotions) {
    wx.navigateTo({
      url: '../uploadImageImg/uploadImageImg?imgUrlsFilePath='+this.data.imgUrls[this.data.currentIndex] +'&currentIndex=' + this.data.currentIndex
    })
  },
  
  onSwipertap: function(e) {
    console.log(e.detail.current)
    console.log(this.data.currentIndex)
    

  },
  


})