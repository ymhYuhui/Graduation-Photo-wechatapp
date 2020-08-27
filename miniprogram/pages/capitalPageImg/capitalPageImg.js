// 李铭鑫   2020.8.27
Page({
  /**
   * 图片点击跳转
   */
  toPhotoMake: function(opotions){
    wx.navigateTo({
      url: '../chooseTemplateImg/chooseTemplateImg'
    })
  },
  toCardMake: function(opotions){
    wx.navigateTo({
      url: '../choosePaperImg/choosePaperImg'
    })
  },
  
})