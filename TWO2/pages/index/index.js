//index.js
//获取应用实例
const app = getApp()

Page({
  
    data:{
      msg:'北方汉子',
      userInfo:{},
      isShow:true
    },
    
    handleClick(){

      wx.switchTab({
        url:'/pages/list/list'
      })
    



  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 做一些初始化工作，发送请求，开启定时器
  //  console.log('onload 页面加载');
      this.getUserInfo();

  },

  getUserInfo(){

    //  判断用户是否授权
    wx.getSetting({
      success: (data) => {

        if (data.authSetting['scope.userInfo']) {
          // 用户已经授权
          this.setData({
            isShow: false
          });
        } else {
          // 没有授权
          this.setData({
            isShow: true
          });
        }
      }
    })

    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userInfo: data.userInfo
        });
      },
      fail: () => {
        console.log('获取失败')
      }
    })

  },


  handleGetUserInfo(data){
    //判断用户点击的是否允许
    if(data.detail.rawData){
      //用户点击的是允许
      this.getUserInfo();
    }
  },

})
