// miniprogram/pages/saveAndshareCardImg/saveAndshareCardImg.js
//2020.9.20 王慧娟
Page({

  data:{
    openSettingBtnHidden: true,//是否授权
    imgUrl: ""
  },
  onLoad: function (options) {
    var that = this
     that.setData({
       imgUrl : options.imgUrl
     })
    },
  // 保存图片
    saveImg:function(e){
      let that = this;
  
      //获取相册授权
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                //这里是用户同意授权后的回调
                that.saveImgToLocal();
              },
              fail() {//这里是用户拒绝授权后的回调
                that.setData({
                  openSettingBtnHidden: false
                })
              }
            })
          } else {//用户已经授权过了
            that.saveImgToLocal();
          }
        }
      })
  
    },
    saveImgToLocal: function (e) {
      let that = this;
   
      let imgSrc = that.data.imgUrl;
      wx.downloadFile({
        url: imgSrc,
        success: function (res) {
          console.log(res);
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
          })
        }
      })
  
    },
  
  //分享图片
    shareImg:function(e){
      let that = this;
  
      //获取相册授权
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                //这里是用户同意授权后的回调
                that.saveImgToLocal();
              },
              fail() {//这里是用户拒绝授权后的回调
                that.setData({
                  openSettingBtnHidden: false
                })
              }
            })
          } else {//用户已经授权过了
            that.onShareAppMessage();
          }
        }
      })
    },
      onShareAppMessage: function (res) {
        let that = this;
   
        let imgSrc = that.data.imgUrl;
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '来定制属于你的毕业照吧',
          imageUrl:imgSrc,
        }
      },

    // 授权
    handleSetting: function (e) {
      let that = this;
      // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
  
      if (!e.detail.authSetting['scope.writePhotosAlbum']) {
        // wx.showModal({
        //   title: '警告',
        //   content: '若不打开授权，则无法将图片保存在相册中！',
        //   showCancel: false
        // })
        that.setData({
          openSettingBtnHidden: false
        })
      } else {
        // wx.showModal({
        //   title: '提示',
        //   content: '您已授权，赶紧将图片保存在相册中吧！',
        //   showCancel: false
        // })
        that.setData({
          openSettingBtnHidden: true
        })
      }
    },

    toEdit: function(opotions) {
      wx.navigateTo({
        url: '/pages/capitalPageImg/capitalPageImg'
      })
    },
})