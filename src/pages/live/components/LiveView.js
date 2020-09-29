import React, { useEffect } from 'react';
import {
  AudioOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import ss from './LiveView.less';

LiveView.propTypes = {
  setVideo: PropTypes.func,
};

LiveView.defaultProps = {
  setVideo: () => {},
};

function LiveView({ setVideo }) {
  useEffect(() => {
    setVideo(document.getElementById('liveVideo'));
  }, []);

  return (
    <div className={ss.root}>
      <div className={ss.header}>
        <div className={ss.title}>title</div>
        <div className={ss.info}>
          <img
            alt=""
            src="https://digital-expo-cdn-prod.oss-cn-hangzhou.aliyuncs.com/enterprise/20200628152124256_3lsf8kxr.png"
          />
          <div>主播:xxx</div>
        </div>
      </div>
      <div className={ss.content}>
        <div className={ss.videoView}>
          <video id="liveVideo" />
          <div className={ss.controls}>
            <div className={ss.leftMenus}>
              <div className={ss.menu}>
                <span className={ss.icon}>
                  <AudioOutlined />
                </span>
                <div className={ss.text}>关闭麦克风</div>
              </div>
              <div className={ss.menu}>
                <span className={ss.icon}>
                  <VideoCameraOutlined />
                </span>
                <div className={ss.text}>关闭摄像头</div>
              </div>
              <div className={ss.menu}>
                <span className={`${ss.icon} ${ss.closeLive}`}>
                  <PhoneOutlined />
                </span>
                <div className={ss.text}>结束直播</div>
              </div>
            </div>
            <div className={ss.rightMenus}>
              <span className={ss.fullScreen}>
                <FullscreenOutlined />
              </span>
            </div>
          </div>
          <div className={ss.startLive}>
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
