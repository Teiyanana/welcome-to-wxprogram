// pages/reading/comment-detail/comment-detail.js
var localData = require('../../../data/comments.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playingMusic: false,  // 是否播放音乐
    currentCommentId: '', // 当前文章id
    curCollected: false, // 是否已收藏
    commentData: '', // 当前文章详细数据
    backgroundAudioManager: '' // 播放音乐的实例
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var commentId = options.id;
    var commentData = localData.commentList[commentId];
    this.data.currentCommentId = commentId; // 该数据只用于当前js文件中，wxml文件没有使用到，故不需使用setData方法更新数据，进而影响视图
    this.setData({
      commentData: commentData
    });
    console.log(this.data.commentData);

    // 本地缓存实现收藏功能
    var commentsCollected = wx.getStorageSync('comments_collected');
    if (commentsCollected && commentsCollected[commentId]) {
      this.setData({
        curCollected: commentsCollected[commentId]
      });
    } else {
      // 默认不收藏
      commentsCollected = commentsCollected || {};
      commentsCollected[commentId] = false;
      wx.setStorageSync('comments_collected', commentsCollected);
    }

    console.log(getCurrentPages());
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 播放|暂停音乐
   */
  onPlayMusic: function(event) {
    var currentCommentId = this.data.currentCommentId;
    var commentData = this.data.commentData;
    var playingMusic = this.data.playingMusic;

    if (!this.data.backgroundAudioManager) {
      const backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.title = commentData.music.title;
      backgroundAudioManager.epname = commentData.music.title;
      backgroundAudioManager.singer = commentData.music.title;
      backgroundAudioManager.coverImgUrl = commentData.music.coverImg;
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = 'http://101.227.216.145/amobile.music.tc.qq.com/C400000ShV1T0JvYMl.m4a?guid=8436307454&vkey=1434C87B3ABDAE73FEEF4884E0CABAAFA764471070391AA7726E72AB9155B6F248BCB3A474E662108A7A8186D97AB237C9825ACB490DAFB0&uin=0&fromtag=66';
      // backgroundAudioManager.stop();
      this.setData({
        backgroundAudioManager: backgroundAudioManager
      });
    } 

    if (playingMusic) {
      this.setData({
        playingMusic: false
      });
      this.data.backgroundAudioManager.pause();
    } else {
      this.setData({
        playingMusic: true
      });
      this.data.backgroundAudioManager.play();
    }
  },
  onCollect: function(event) {
    /**
     * 点击收藏按钮切换收藏状态
     */
    var collected = !this.data.curCollected;
    this.setData({
      curCollected: collected
    });
    var commentsCollected = wx.getStorageSync('comments_collected');
    commentsCollected[this.data.currentCommentId] = collected;
    wx.setStorage({
      key: 'comments_collected',
      data: commentsCollected, 
      success: function () {
        wx.showToast({
          title: collected ? '收藏成功' : '取消成功',
          duration: 1000,
          icon: 'success'
        });
      }
    });
  },
  onShare: function(event) {
    /**
     * 点击分享操作
     */
    var actionItemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: actionItemList,
      itemColor: '#405f80',
      success: function(res) {
        console.log(res);
        if (res.tapIndex === 0) {
          // 分享给好友
          wx.showShareMenu({
            withShareTicket: true
          });
          return;
        }
        wx.showModal({
          title: '用户' + actionItemList[res.tapIndex],
          content: '用户是否取消？'
        });
      }
    });
  }
});