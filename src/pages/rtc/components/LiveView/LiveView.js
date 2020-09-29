import React, { useEffect } from 'react';
import {
  AudioOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
// import {classnames} from 'utils/'
import { classnames } from '@/utils/utils';
import PropTypes from 'prop-types';
import ss from './index.less';

LiveView.propTypes = {
  setVideo: PropTypes.func, // 初始化时，返回video dom对象
  viewData: PropTypes.func, // 查看资料
  startLive: PropTypes.func, // 开始直播
  camera: PropTypes.bool, // 摄像头, true为打开，false为关闭
  switchCamera: PropTypes.func, // 打开/关闭摄像头
  audio: PropTypes.bool, // 麦克风, true为打开，false为关闭
  switchAudio: PropTypes.func, // 打开/关闭麦克风
  endLive: PropTypes.func, // 结束直播
};

LiveView.defaultProps = {
  setVideo: () => {},
  viewData: () => {},
  startLive: () => {},
  camera: false,
  switchCamera: () => {},
  audio: true,
  switchAudio: () => {},
  endLive: () => {},
};

function LiveView({
  startLive,
  viewData,
  setVideo,
  camera,
  audio,
  switchCamera,
  switchAudio,
  endLive,
}) {
  useEffect(() => {
    setVideo(document.getElementById('liveVideo'));
  }, []);

  const contentFullScreen = () => {
    document.getElementById('liveContent').requestFullscreen();
  };

  const videoFullScreen = () => {
    document.getElementById('liveVideo').requestFullscreen();
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
        </div>
      </div>
      <div className={ss.content} id="liveContent">
        <div className={ss.videoView}>
          <div className={ss.video}>
            <video
              id="liveVideo"
              autoPlay
              playsInline
              className={ss.mainVideo}
            />
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
              <div className={ss.menu} onClick={endLive}>
                <span className={`${ss.icon} ${ss.closeLive}`}>
                  <PhoneOutlined />
                </span>
                <div className={ss.text}>结束直播</div>
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
          <div className={ss.startLive} onClick={startLive}>
            <button type="button">开始直播</button>
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

export default LiveView;
