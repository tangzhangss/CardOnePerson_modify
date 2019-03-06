// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    threeThings: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData()
  },
  onShow: function(options) {
    this.initData();
  },

  initData: function() {
    
    var threeThings = wx.getStorageSync('threeThings').threeThings;

    if (threeThings) {
      // console.log('首页', threeThings)
      this.setData({
        threeThings: threeThings
      })
    }
  },
  complete:function(e){
    let index = e.currentTarget.dataset.index;
    let ach = this.data.threeThings[index].ach;

  

    let prevVaule = wx.getStorageSync("achValue"); 
    let achValue = parseInt(prevVaule == '' ? 0 : prevVaule);
    
    achValue = achValue + parseInt(ach);
   
    wx.setStorageSync("achValue", achValue);
    

   
    //成就值变化曲线
    let achLine = wx.getStorageSync("achLine") == '' ? [] : wx.getStorageSync("achLine");
    
    if(achLine.length < 1){
      achLine.push(0);
    }
    achLine.push(achValue);
    wx.setStorageSync('achLine', achLine);

    this.data.threeThings[index].complete = true;
   
    var tthing = {
      time: new Date(),
      threeThings: this.data.threeThings
    }
    wx.setStorageSync('threeThings', tthing);

    console.log("成就值改变", index, ach, wx.getStorageSync("achValue"), wx.getStorageSync("achLine"));

    this.onLoad();  
  },
  onAddThreeThings: function(event) {

    wx: wx.navigateTo({
      url: 'create/create',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})