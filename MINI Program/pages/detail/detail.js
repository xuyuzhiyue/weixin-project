// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
let appDatas = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数值
    let index=options.index;
    // 跟新data中detailobj对应的状态值
    this.setData({
    detailObj:datas.list_data[index],
       index
    });

    // 根据本地混村的数据判断用户是否收藏当前的文章
   let detailStorage = wx.getStorageSync('isCollected');
  
   if(!detailStorage){
     wx.setStorageSync('isCollected',{});
   }
    //判断用户是否收藏
    if(detailStorage[index]){//证明收藏过
        this.setData({
          isCollected:true
        })
    }    
    // 监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
      // 修改ismusicplay状态
      this.setData({
         isMusicPlay:true
      });

      //修改appDAtasx中的数据
      appDatas.data.isPlay =true;
      appDatas.data.pageIndex =index;

    });

    //判断音乐是否在播放
    if(appDatas.data.isPlay && appDatas.data.pageIndex == index){
      this.setData({
        isMusicPlay: true
      });
    }


    //监听音乐暂停
    wx.onBackgroundAudioPause(() => {
      // 修改ismusicplay状态
      this.setData({
        isMusicPlay: false
      });

      //修改appDAtasx中的数据
      appDatas.data.isPlay = false;
      // appDatas.data.pageIndex = index;
    })

  },

  handleCollection(){
    let isCollected = !this.data.isCollected;
      // 更新状态
    this.setData({
      isCollected
    });
    //  提示用户
    let title = isCollected?'收藏成功':'取消收藏';
    wx.showToast({
      title,
      icon:'success'
    });

    // 缓存数据到本地
    let {index} = this.data;
    // let obj={};
    wx.getStorage({
     key:'isCollected',
     success:(datas)=>{
       let obj=datas.data;
       obj[index] = isCollected;
       wx.setStorage({
         key: 'isCollected',
         data:obj,
         success: () => {
           console.log('缓存成功');
         }
       });
     }
    })
  },

  handleMusicPlay(){
    // 处理音乐播放
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });


    //控制音乐播放
    if (isMusicPlay){
      //播放音乐
    let{dataUrl,title}=this.data.detailObj.music;
    wx.playBackgroundAudio({
      dataUrl,
      title
     })
    }else{
      //暂停音乐
      wx.pauseBackgroundAudio()
    }
  },

//处理点击分享功能
  handleShare(){
    wx,wx.showActionSheet({
      itemList: [ '分享到朋友圈','分享给朋友','分享到QQ空间','分享到微博'],
      itemColor: 'black',

    })
  }
})