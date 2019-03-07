var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push(i);
      data.push(i);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  onShow: function (e) {
    let achLine = wx.getStorageSync("achLine") == '' ? [] : wx.getStorageSync("achLine");

    this.setData({
      achLine: achLine
    })
    if(achLine.length < 1){
      
      return false;
    }


    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '成就值:',
        data: achLine,
        format: function (val, name) {
          return val;
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成就值',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  }
});