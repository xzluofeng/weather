// pages/main/main.js
Page({
  data:{
    city:'',
    today:{

    },
    future:{

    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadInfo();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadInfo:function(){
    var that = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          console.log(latitude,longitude);
          that.loadCity(latitude,longitude);
        }
      })
  },
  loadCity:function(latitude,longitude){
      var that = this;
      wx.request({
        //百度api
        // url: 'http://api.map.baidu.com/geocoder/v2/?ak=s3H1svg4rhAwL6viQNDMVAyCN1XYTlGO&location='+latitude+','+longitude+'&output=json',
        //高德api
        url:'http://restapi.amap.com/v3/geocode/regeo?output=json&location='+longitude+','+latitude+'&key=5b0d1c5bb6c1624ad308a15555618855&radius=1000&extensions=all',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.regeocode.addressComponent.city);
          var city = res.data.regeocode.addressComponent.city;
          // console.log(res.data.result.addressComponent.city);
          // var city = res.data.result.addressComponent.city;

          city = city.replace("市","");
          that.setData({city:city});
          that.loadWeather(city);
        }
      })
  },
  loadWeather:function(city){
      var that = this;
      wx.request({
        url: 'http://wthrcdn.etouch.cn/weather_mini?city='+city,
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res);
          console.log(res.data.data.wendu);
          var future = res.data.data.forecast;
          var todayInfo = future.shift();
          var today = res.data.data;
          today.todatInfo = todayInfo;
          that.setData({today:today,future:future});
        }
      })
  }
})