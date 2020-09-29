/* eslint-disable */

import sha256 from './sha256';
/**
 * 初始化订阅状态
 * @param {String} userId
 */
export function initialization(aliWebrtc, userId) {
  if (aliWebrtc) {
    aliWebrtc.configRemoteAudio(userId, false);
    aliWebrtc.configRemoteCameraTrack(userId, false, false);
    aliWebrtc.configRemoteScreenTrack(userId, false);
  }
}

/**
 * 分析远端用户信息
 * @param {String} userId
 */
function getSubscribeInfo(userId) {
  var userInfo = aliWebrtc.getUserInfo(userId);
  var subscribeInfo = [],
    subscribeInfoArr = [],
    isSubAudio = false,
    isSubLarge = false,
    isSubSmall = false,
    isSubCamera = false,
    isSubScreen = false,
    isSubVideo = false;
  if (userInfo) {
    userInfo.streamConfigs.forEach((v) => {
      if (v.subscribed) {
        subscribeInfo.push(v.label);
        subscribeInfoArr.push(v);
        v.type == 'audio' ? (isSubAudio = true) : '';
        v.type == 'video' ? (isSubVideo = true) : '';
        v.label == 'sophon_video_camera_large' ? (isSubLarge = true) : '';
        v.label == 'sophon_video_camera_small' ? (isSubSmall = true) : '';
        v.label == 'sophon_video_screen_share' ? (isSubScreen = true) : '';
        if (isSubLarge || isSubSmall) {
          isSubCamera = true;
        }
      }
    });
  }
  return {
    subscribeInfo: subscribeInfo,
    subscribeInfoArr: subscribeInfoArr,
    isSubLarge: isSubLarge,
    isSubSmall: isSubSmall,
    isSubCamera: isSubCamera,
    isSubAudio: isSubAudio,
    isSubScreen: isSubScreen,
    isSubVideo: isSubVideo,
  };
}

/**
 * 取消订阅设置
 * @param {String} userId
 * @param {String} type
 * @param {String} label
 */
function setConfigRemote(userId, type, label) {
  return new Promise((resolve, reject) => {
    if (type == 'audio') {
      aliWebrtc.configRemoteAudio(userId, false);
    } else {
      if (label === 'sophon_video_camera_large') {
        aliWebrtc.configRemoteCameraTrack(userId, false, false);
        console.warn('取消相机流');
      } else if (label === 'sophon_video_screen_share') {
        console.warn('取消共享流');
        aliWebrtc.configRemoteScreenTrack(userId, false);
      }
    }
    aliWebrtc
      .subscribe(userId)
      .then((re) => {
        resolve();
      })
      .catch((err) => {
        console.error('重新订阅失败', err);
        alert(err.message);
      });
  });
}

/**
 * 显示提示信息，并打印
 * @param {String} text 要显示的信息
 * @param {String} type 信息类型(默认成功)
 * @param {Number} delay 延迟时间(默认2.5s)
 */
function showAlert(text, type, delay) {
  if (!text) return;
  var _type = type ? 'alert-' + type : 'alert-success';
  var _delay = delay || 2500;
  $('.alert')
    .html(text)
    .addClass(_type)
    .show()
    .delay(_delay)
    .fadeOut('normal', () => {
      $('.alert').removeClass(_type);
    });
  if (_type === 'warning') {
    console.warn(text);
  } else if (_type === 'danger') {
    console.error(text);
  } else {
    console.log(text);
  }
}

/**
 * 根据属性值获取在数组中的index
 */
Array.prototype.getIndexByProprety = function(val, proprety) {
  var arr = this;
  var index = -1;
  arr.forEach((v, i, a) => {
    if (v[proprety] == val) {
      index = i;
    }
  });
  return index;
};

/**
 * 根据属性值获取数组中的某项
 */
Array.prototype.getObjByProprety = function(val, proprety) {
  var arr = this;
  var obj = {};
  arr.forEach((v, i, a) => {
    if (v[proprety] === val) {
      obj = v;
    }
  });
  return obj;
};

/*
 * 获取测试token
 * @param {*} channelId 频道号
 * @return {object} authinfo
 */
export const GenerateAliRtcAuthInfo = (channelId) => {
  var appId = 'k6hqkgw2'; // 修改为自己的appid 该方案仅为开发测试使用，正式上线需要使用服务端的AppServer
  var appKey = '728eefe394fbef560200ce40cee6fa44'; // 修改为自己的appkey 该方案仅为开发测试使用，正式上线需要使用服务端的AppServer
  const userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  ); // 可以自定义
  var timestamp = parseInt(new Date().getTime() / 1000 + 48 * 60 * 60);
  var nonce = 'AK-' + timestamp;
  var token = sha256(appId + appKey + channelId + userId + nonce + timestamp);

  var userName = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);

  return {
    appid: appId,
    userid: userId,
    userName,
    timestamp,
    nonce,
    token,
    gslb: ['https://rgslb.rtc.aliyuncs.com'],
    channel: channelId,

    // appid: appId,
    // userid: userId,
    // userName,
    // timestamp: '1600591387',
    // nonce: 'AK-c9b3d055-20de-47e8-9db5-ad9ebf54806e',
    // token: '0257964f85a38dc2865ad56dd8e79adf6508d3a49fd23618e23f27ffcf2ead33',
    // gslb: ['https://rgslb.rtc.aliyuncs.com'],
    // channel: channelId,
  };
};
