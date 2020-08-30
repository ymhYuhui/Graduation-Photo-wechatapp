/* 2020.8.30 王慧娟 */
const Luck = require("../../utils/luck.js");
//const uilt = require('../../utils/util.js');
Page({
  data: {
    width: 250,
    height: 250,
  },

  onLoad() {
    const that = this
    let options = {
      canvasid: 'luck',
      width: that.data.width, //canvas宽
      height: that.data.height, //canvas高
      maskColor: '#FFFFFF', //遮罩的颜色
      size: 10, //清除轨迹的宽度
      scale: 0.75, //可以理解为手动清除面积上限，范围0~1
    }
    that.luck = new Luck(that, options);
  },


})