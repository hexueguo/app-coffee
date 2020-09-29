import React, { useEffect } from 'react';
import {
  AudioOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  ExpandOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
// import {classnames} from 'utils/'
import { classnames } from '@/utils/utils';
import PropTypes from 'prop-types';
import ss from './index.less';

MeetingView.propTypes = {
  setVideo: PropTypes.func, // 初始化时，返回videoMain dom对象
  viewData: PropTypes.func, // 查看资料
  startMeeting: PropTypes.func, // 开始直播
  guestVideos: PropTypes.array, // 嘉宾列表
  switchVideo: PropTypes.func, // 点击某个嘉宾视频
  camera: PropTypes.bool, // 摄像头, true为打开，false为关闭
  switchCamera: PropTypes.func, // 打开/关闭摄像头
  audio: PropTypes.bool, // 麦克风, true为打开，false为关闭
  switchAudio: PropTypes.func, // 打开/关闭麦克风
  shareScreen: PropTypes.bool, // 麦克风, true为打开，false为关闭
  switchShareScreen: PropTypes.func, // 打开/关闭麦克风
  closeMeeting: PropTypes.func, // 关闭会议
  allMute: PropTypes.bool, // 全员静音, true为打开，false为取消
  switchAllMute: PropTypes.func, // 开启/关闭 全员静音
  msgBoard: PropTypes.bool, // 留言板禁言, true为打开，false为取消
  switchMsgBoard: PropTypes.func, // 开启/关闭 全员静音
  invite: PropTypes.func, // 邀请人员加入
};

MeetingView.defaultProps = {
  setVideo: () => {},
  viewData: () => {},
  startMeeting: () => {},
  guestVideos: [],
  switchVideo: () => {},
  camera: false,
  switchCamera: () => {},
  audio: true,
  switchAudio: () => {},
  shareScreen: false,
  switchShareScreen: () => {},
  closeMeeting: () => {},
  allMute: false,
  switchAllMute: () => {},
  msgBoard: false,
  switchMsgBoard: () => {},
  invite: () => {},
};

function MeetingView({
  setVideo,
  viewData,
  startMeeting,
  guestVideos,
  switchVideo,
  camera,
  audio,
  switchCamera,
  switchAudio,
  shareScreen,
  switchShareScreen,
  closeMeeting,
  allMute,
  switchAllMute,
  msgBoard,
  switchMsgBoard,
  invite,
}) {
  useEffect(() => {
    setVideo(document.getElementById('meetingMainVideo'));
  }, []);

  const contentFullScreen = () => {
    document.getElementById('meetingContent').requestFullscreen();
  };

  const videoFullScreen = () => {
    document.getElementById('meetingVideo').requestFullscreen();
  };

  return (
    <div className={ss.root}>
      <div className={ss.header}>
        <div className={ss.top}>
          <div className={ss.title}>PC直播</div>
          <div className={ss.viewData} onClick={viewData}>
            <img
              src="https://daily.digitalexpo.com/resource/5eb66c2e8fa14029aa4980a8/96db4708408468982c83f2b2d3228741.png"
              alt=""
            />
            <span>查看资料</span>
          </div>
          <img
            className={ss.contentFullScreen}
            onClick={(e) => {
              e.stopPropagation();
              contentFullScreen();
            }}
            src="https://daily.digitalexpo.com/resource/5eb66c2e8fa14029aa4980a8/b87cddc0ab5ad2590f902521ac97e5eb.png"
            alt=""
          />
        </div>
        <div className={ss.info}>
          <img
            alt=""
            src="https://digital-expo-cdn-prod.oss-cn-hangzhou.aliyuncs.com/enterprise/20200628152124256_3lsf8kxr.png"
          />
          <div className={ss.zhubo}>
            <span className={ss.label}>主播：</span>
            <span>xxx</span>
          </div>
          <div className={ss.guestNum}>
            <span className={ss.label}>嘉宾人数：</span>
            <span> 0/10</span>
          </div>
        </div>
      </div>
      <div className={ss.content} id="meetingContent">
        <div className={ss.videoView}>
          <div className={ss.video} id="meetingVideo">
            <video
              id="meetingMainVideo"
              autoPlay
              playsInline
              className={ss.mainVideo}
            />
            <div className={ss.otherVideos}>
              {guestVideos.map((el, index) => (
                <video
                  autoPlay
                  playsInline
                  key={index}
                  className={ss.otherVideo}
                  onClick={() => {
                    switchVideo(el);
                  }}
                />
              ))}
            </div>
          </div>
          <div className={ss.controls}>
            <div className={ss.leftMenus}>
              <div
                className={classnames(ss.menu, { [ss.closed]: !audio })}
                onClick={switchAudio}
              >
                <span className={ss.icon}>
                  <AudioOutlined />
                </span>
                <div className={ss.text}>
                  {audio ? '关闭麦克风' : '打开麦克风'}
                </div>
              </div>

              <div
                className={classnames(ss.menu, { [ss.closed]: !camera })}
                onClick={switchCamera}
              >
                <span className={ss.icon}>
                  <VideoCameraOutlined />
                </span>
                <div className={ss.text}>
                  {camera ? '关闭摄像头' : '打开摄像头'}
                </div>
              </div>

              <div
                className={classnames(ss.menu, { [ss.closed]: shareScreen })}
                onClick={switchShareScreen}
              >
                <span className={ss.icon}>
                  <VideoCameraOutlined />
                </span>
                <div className={ss.text}>
                  {shareScreen ? '关闭屏幕共享' : '屏幕共享'}
                </div>
              </div>

              <div className={ss.menu} onClick={closeMeeting}>
                <span className={`${ss.icon} ${ss.closeLive}`}>
                  <PhoneOutlined />
                </span>
                <div className={ss.text}>关闭</div>
              </div>

              <div
                className={classnames(ss.menu, { [ss.closed]: allMute })}
                onClick={switchAllMute}
              >
                <span className={ss.icon}>
                  <UsergroupAddOutlined />
                </span>
                <div className={ss.text}>
                  {allMute ? '取消静音' : '全员静音'}
                </div>
              </div>

              <div
                className={classnames(ss.menu, { [ss.closed]: msgBoard })}
                onClick={switchMsgBoard}
              >
                <span className={ss.icon}>
                  <MessageOutlined />
                </span>
                <div className={ss.text}>
                  {msgBoard ? '取消禁言' : '留言板禁言'}
                </div>
              </div>

              <div className={classnames(ss.menu)} onClick={invite}>
                <span className={ss.icon}>
                  <PlusOutlined />
                </span>
                <div className={ss.text}>邀请</div>
              </div>
            </div>

            <div className={ss.rightMenus}>
              <span
                className={ss.fullScreen}
                onClick={(e) => {
                  e.stopPropagation();
                  videoFullScreen();
                }}
              >
                <ExpandOutlined />
              </span>
            </div>
          </div>
          <div className={ss.startLive} onClick={startMeeting}>
            <button type="button">开始会议</button>
          </div>
        </div>

        <div className={ss.chatText}>
          <div className={ss.chatWindow}>
            <div className={ss.headerTitle}>观众留言</div>
            <div className={ss.chatlist}>chatWindow</div>
          </div>
          <div className={ss.inputText}>
            <textarea className={ss.textarea} placeholder="发送消息" />
            <button className={ss.sendButton} type="button">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingView;
