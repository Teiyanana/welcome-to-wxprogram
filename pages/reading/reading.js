var localData = require('../../data/comments.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [
      {url: './images/swiper/wx.png', id: 3},
      { url: './images/swiper/iqiyi.png', id: 4},
      { url: './images/swiper/vr.png', id: 5}
    ],
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      commentList: localData.commentList
    });
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
   * 点击banner查看详细内容
   */
  onReadSwiperDetail: function(event) {
    var bannerId = event.target.dataset.bannerid;
    wx.navigateTo({
      url: 'comment-detail/comment-detail?id=' + bannerId,
    });
  },

  /**
   * 点击查看详细的评论信息
   */
  onReadCommentDetail: function (event) {
    var commentId = event.currentTarget.dataset.commentid;
    wx.navigateTo({
      url: 'comment-detail/comment-detail?id=' + commentId,
    });
  }
})