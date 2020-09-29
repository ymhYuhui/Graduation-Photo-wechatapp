const app = getApp()
Page({
  //初始化
  data: {
    //隐藏canvas的长宽为0
    tempCanvasWidth:0,
    tempCanvasHeight:0,
    //图片显示框imageView的起始高度为0
    imgViewHeight:0,
    minScale: 0.5,
    maxScale: 2.5,
    tempImageSrc:'',
    imgWidth:0,
    imgHeight:0,
    imgTop:0,
    imgLeft:0,
    canvasHeight: 0,   //canvas动态高度，单位rpx
    isChooseWidth:false,
    isChooseColor:false,
    // isChooseBack:false,
    isEraser:false,
    //定义颜色种类
    allColor: ['#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8','#ffaec9','#a349a4','#ffffff','#c3c3c3'],
    //添加文字
    isChooseFontSize: false,
    isChooseFontColor: false,
    isChooseFontPattern: false,
    allText:{},
    // texted:false,
    inputFocus:false,
    isCombine: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var self = this
    self.setData({
      tempImageUrl : options.imgUrl
    })
    console.log(self.data.tempImageUrl)
    
    // //self.device = wx.getSystemInfoSync()
    self.device = app.globalData.myDevice
    self.deviceRatio = self.device.windowWidth / 750
    self.imgViewHeight = self.device.windowHeight - 160 * self.deviceRatio
    self.setData({
    imgViewHeight: self.imgViewHeight,
     // tempCanvasHeight: self.imgViewHeight,
     })
     wx.cloud.downloadFile({
      fileID: self.data.tempImageUrl,
      success: function (res) {
        self.setData({
          tempImageFilePath: res.tempFilePath,
        })
        loadImgOnImage(self)
        
        console.log(self.data.tempImageFilePath)
      },
      fail: function (res) {
        console.log(res.detail)
      }
    })

  },

  //将text组件的内容与用户输入绑定
  focusInput(){
    this.setData({
      inputFocus: !this.data.inputFocus,
    })
  },
  //开始输入
  inputText(e){
    var allText = this.data.allText
    allText.someText = e.detail.value
    if (allText.someText.length == 0) {
      allText.someText = "点击输入文字"
      }
    this.setData({
      allText: allText
    })
  },
  //开始移动文字
  textMoveStart(e){
    this.textX = e.touches[0].clientX
    this.textY = e.touches[0].clientY
  },
  //移动文字
  textMove(e){
    var allText = this.data.allText
    var dragLengthX = (e.touches[0].clientX - this.textX)
    var dragLengthY = (e.touches[0].clientY - this.textY)
    var minTextL = 0
    var minTextT = 0
    var maxTextL = (750 - 100) * this.deviceRatio
    var maxTextT = this.imgViewHeight - 40 * this.deviceRatio
    var newTextL = allText.textL + dragLengthX
    var newTextT = allText.textT + dragLengthY
    if (newTextL < minTextL) newTextL = minTextL
    if (newTextL > maxTextL) newTextL = maxTextL
    if (newTextT < minTextT) newTextT = minTextT
    if (newTextT > maxTextT) newTextT = maxTextT

    allText.textL = newTextL
    allText.textT = newTextT
    this.setData({
      allText: allText,
      isChooseFontSize: false,
      isChooseFontColor: false,
      isChooseFontPattern: false
    })
    this.textX = e.touches[0].clientX
    this.textY = e.touches[0].clientY
    
    console.log(this.data.allText)
  },
  //选择添加文字
  chooseaddText(){
    var allText={}
    allText={
      idx: allText.length - 1,
      someText: "点击输入文字",
      fontColor: this.fontColor ? this.fontColor:'rgba(20,20,20,0.8)',
      fontSize: this.fontSize ? this.fontSize:14,
      fontStyle: 'normal',
      fontWeight: 'normal',
      textL: 140,
      textT: 125,
      isTextActive: true,
    }
    
    this.setData({
      allText: allText,
      isChooseFontSize: false,
      isChooseFontColor: false,
      isChooseFontPattern: false
    })
  },
  //取消添加文字
  cancelAddText(){
    var allText = this.data.allText
    allText.isTextActive = false
    this.setData({
      allText: allText,
      inputFocus:false,
      isChooseFontSize: false,
      isChooseFontColor: false,
      isChooseFontPattern: false
    })
  },
  //确认添加文字（保存）
  competeAddText(){
    var self=this
    var allText = self.data.allText
    if (allText.someText == "点击输入文字" || allText.someText == ""){
      self.cancelAddText()
    }else{
      wx.showLoading({
        title: '保存文字',
      })
      allText.isTextActive = false
      var initRatio = self.initRatio
      if (self.initRatio<1){ //解决问题：小图或者过度裁剪后的图添加文字时文字虚化
        initRatio=1
      }
      var tempCanvasWidth = self.scaleWidth * initRatio
      var tempCanvasHeight = self.scaleHeight * initRatio

      self.setData({
        allText: allText,
        inputFocus: false,
        isChooseFontSize: false,
        isChooseFontColor: false,
        isChooseFontPattern: false,
        tempCanvasWidth: tempCanvasWidth,
        tempCanvasHeight: tempCanvasHeight
      })

      var ctx = wx.createCanvasContext('tempCanvas')
      ctx.drawImage(self.data.tempImageFilePath, 0, 0, tempCanvasWidth, tempCanvasHeight)
      ctx.setFillStyle(allText.fontColor)
      var canvasFontSize = Math.ceil(allText.fontSize * initRatio)
      ctx.font = allText.fontStyle + ' ' + allText.fontWeight + ' ' + canvasFontSize + 'px sans-serif'
      ctx.setTextAlign('left')
      ctx.setTextBaseline('top')
      ctx.fillText(allText.someText, allText.textL , allText.textT )
      ctx.draw()
      saveImgUseTempCanvas(self, 100, null)
    }
  },
  //选择更改字号
  chooseFontsize(){
    this.setData({
      isChooseFontSize: !this.data.isChooseFontSize,
      isChooseFontColor: false,
      isChooseFontPattern: false
    })
  },
  //字号滑动条
  fontsizeSliderChange(e) {
    this.fontSize = e.detail.value
    var allText = this.data.allText
    if (allText !=={}&& (allText.isTextActive)){
      allText.fontSize = this.fontSize
      this.setData({
        allText: allText
      })
    }
  },
  //选择更改颜色
  chooseFontColor() {
    this.setData({
      isChooseFontSize: false,
      isChooseFontColor: !this.data.isChooseFontColor,
      isChooseFontPattern: false
    })
  },
  //颜色设置
  fontColorChange(e) {
    this.fontColor = e.target.dataset.selected
    var allText = this.data.allText
    if (allText && (allText.isTextActive)) {
      allText.fontColor = this.fontColor
      this.setData({
        allText: allText
      })
    }
  },
  //选择更改样式
  chooseFontPattern(){
    this.setData({
      isChooseFontSize: false,
      isChooseFontColor: false,
      isChooseFontPattern: !this.data.isChooseFontPattern
    })
  },
  //斜体
  fontStyleChange(e){
    this.fontStyle = e.detail.value ? 'oblique' : 'normal'
    var allText = this.data.allText
    if (allText!=={} && (allText.isTextActive)) {
      allText.fontStyle = this.fontStyle
      this.setData({
        allText: allText
      })
    }
  },
  //加粗
  fontWeightChange(e){
    this.fontWeight = e.detail.value ? 'bold' : 'normal'
    var allText = this.data.allText
    if (allText!=={} && (allText.isTextActive)) {
      allText.fontWeight = this.fontWeight
      this.setData({
        allText: allText
      })
    }
  },
  
  toEdit: function(_opotions) {
   var self = this
   if(self.data.isCombine == true){
    wx.navigateTo({
      url: '../saveAndshareCardImg/saveAndshareCardImg?imgUrl='+self.data.tempImageSrc
    })
  }else{
    wx.navigateTo({
      url: '../saveAndshareCardImg/saveAndshareCardImg?imgUrl='+self.data.tempImageFilePath
    })
  }
  },
  
})

 //加载图片在image上
 function loadImgOnImage(self){
   wx.getImageInfo({
     src: self.data.tempImageFilePath,
     success: function (res) {
       self.oldScale = 1
       self.initRatio = res.height / self.imgViewHeight  //转换为了px 图片原始大小/显示大小
       if (self.initRatio < res.width / (750 * self.deviceRatio)) {
         self.initRatio = res.width / (750 * self.deviceRatio)
       }
       //图片显示大小
       self.scaleWidth = (res.width / self.initRatio)
       self.scaleHeight = (res.height / self.initRatio)

       self.initScaleWidth = self.scaleWidth
       self.initScaleHeight = self.scaleHeight
       self.startX = 750 * self.deviceRatio / 2 - self.scaleWidth / 2;
       self.startY = self.imgViewHeight / 2 - self.scaleHeight / 2;
       self.setData({
         imgWidth: self.scaleWidth,
         imgHeight: self.scaleHeight,
         imgTop: self.startY,
         imgLeft: self.startX
       })
       wx.hideLoading();
     }
   })
 }




// //?
 function throttle(fn, miniTimeCell) {
   var timer = null,
     previous = null;

   return function () {
     var now = +new Date(),
       context = this,
       args = arguments;
     if (!previous) previous = now;
     var remaining = now - previous;
     if (miniTimeCell && remaining >= miniTimeCell) {
       fn.apply(context, args);
       previous = now;
     }
   }
 }
 const fn = throttle(drawOnTouchMove, 100)


// //涂鸦？
 function drawOnTouchMove(self, e) {
   let { minScale, maxScale } = self.data
   let [touch0, touch1] = e.touches
  let xMove, yMove, newDistance, xDistance, yDistance

   if (e.timeStamp - self.timeOneFinger < 100) {//touch时长过短，忽略
     return
   }

   // 单指手势时触发
   if (e.touches.length === 1) {
     //计算单指移动的距离
     xMove = touch0.clientX - self.touchX
     yMove = touch0.clientY - self.touchY
     //转换移动距离到正确的坐标系下
     self.imgLeft = self.startX + xMove
     self.imgTop = self.startY + yMove

     self.setData({
       imgTop: self.imgTop,
       imgLeft: self.imgLeft
     })
   }
   // 两指手势触发
   if (e.touches.length >= 2) {
     // self.timeMoveTwo = e.timeStamp
     // 计算二指最新距离
     xDistance = touch1.clientX - touch0.clientX
     yDistance = touch1.clientY - touch0.clientY
     newDistance = Math.sqrt(xDistance * xDistance + yDistance * yDistance)

     //  使用0.005的缩放倍数具有良好的缩放体验
     self.newScale = self.oldScale + 0.005 * (newDistance - self.oldDistance)

     //  设定缩放范围
     self.newScale <= minScale && (self.newScale = minScale)
     self.newScale >= maxScale && (self.newScale = maxScale)

     self.scaleWidth = self.newScale * self.initScaleWidth
     self.scaleHeight = self.newScale * self.initScaleHeight

     self.imgLeft = self.deviceRatio*750 / 2 - self.newScale * self.initLeft
    self.imgTop = self.imgViewHeight / 2 - self.newScale *self.initTop
     self.setData({
      imgTop: self.imgTop,
       imgLeft: self.imgLeft,
      imgWidth: self.scaleWidth,
       imgHeight: self.scaleHeight
     })

   }
 }

//把图片保存到临时路径
 function saveImgUseTempCanvas(self, delay, fn){
  setTimeout(function () {
    wx.canvasToTempFilePath({
       x:0,
       y:0,
       width: self.data.tempCanvasWidth,
       height: self.data.tempCanvasHeight,
       destWidth: self.data.tempCanvasWidth,
       destHeight: self.data.tempCanvasHeight,
       fileType: 'png',
       quality: 1,
       canvasId: 'tempCanvas',
       success: function (res) {
         wx.hideLoading();
         console.log(res.tempFilePath)
         self.setData({
           tempImageSrc: res.tempFilePath,
           isCombine: true
         })
        if(fn){
          fn(self) 
         }
       }
     })
   }, delay)


 }

