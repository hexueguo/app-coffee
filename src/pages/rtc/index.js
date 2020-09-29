/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { message as Msg, Input } from 'antd';
import 'aliyun-webrtc-sdk';
import { GenerateAliRtcAuthInfo, initialization } from './utils/utils';
// import './utils/utils.js';
// import './utils/sha256';
import SS from './index.less';
import { Live } from './components/LiveView/index';

// EtcDemo.propTypes = {

// };

function EtcDemo() {
  const [aliWebrtc, setAliWebrtc] = useState(); // rtc对象
  const [loginVisib, setLoginVisib] = useState(true);
  const [previewVisib, setPreviewVisib] = useState(false); // 是否开启预览
  const [channelId, setChannelId] = useState();
  const [roomId, setRoomId] = useState();

  const [videoDom, setVideoDom] = useState();

  const [userList, setUserList] = useState([]); //
  // const publisherList = [];

  useEffect(() => {
    start();
  }, []);

  const start = () => {
    // var channelId;
    // var userName = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
    // var publisherList = [];
    // eslint-disable-next-line no-undef
    const aliWebrtc_ = new AliRtcEngine();
    setAliWebrtc(aliWebrtc_);

    aliWebrtc_
      .isSupport({ isDebug: true })
      .then((re) => {
        console.log('-----[支持rtc]-----', re);
      })
      .catch((error) => {
        console.log('-----[浏览器不支持rtc]-----', error);
      });
  };

  const init = () => {
    if (!aliWebrtc) return;
    addListens();

    // jionRoom();
  };

  // 开启会议
  const startRoom = () => {
    init();
    setLoginVisib(false);
    jionRoom(2, 0);
  };

  // 主持人开启会议/直播房间
  const jionRoom = (channelProfile, role = 0) => {
    aliWebrtc.setChannelProfile(channelProfile); // 设置互动模式
    aliWebrtc.setClientRole(role); // 设置互动角色

    switchPreview(true); // 1.开启预览

    // 2. 获取频道鉴权令牌参数 为了防止被盗用建议该方法在服务端获取
    const { userName, ...authInfo } = GenerateAliRtcAuthInfo(channelId);
    console.log('------[当前用户]------', userName);
    // // 3. 加入房间 默认推音频视频流
    aliWebrtc
      .joinChannel(authInfo, userName)
      .then(() => {
        console.log('-----[加入房间成功]-----', '房间:', channelId);
        // 4. 发布本地流
        aliWebrtc.configLocalAudioPublish = true;
        aliWebrtc.configLocalCameraPublish = true;
        console.log('------[开始推流]-----');
        aliWebrtc.publish().then(
          (res) => {
            console.log('[发布流成功]', res);
            // console.log('------[开始推流]-----');
          },
          (error) => {
            console.log('------[推流失败]-----', error);
          }
        );
      })
      .catch((error) => {
        console.log('------[加入房间失败]-----', error);
      });
  };

  const startLive = () => {
    aliWebrtc.publish().then(
      (res) => {
        setTimeout(() => {
          console.log('发布流成功', res);
          console.log('------[开始推流]-----');
        }, 2000);
      },
      (error) => {
        console.log('------[推流失败]-----', error);
      }
    );
  };

  // 观众进入会议
  const attendeeStartRoom = () => {
    init();
    setLoginVisib(false);
    attendeeJionRoom(2, 1);
  };

  // 参会者/观众加入房间
  const attendeeJionRoom = (channelProfile, role = 1) => {
    aliWebrtc.setChannelProfile(channelProfile); // 设置互动模式
    aliWebrtc.setClientRole(role); // 设置互动角色

    //  获取频道鉴权令牌参数 为了防止被盗用建议该方法在服务端获取
    const { userName, ...authInfo } = GenerateAliRtcAuthInfo(roomId);
    aliWebrtc
      .joinChannel(authInfo, userName)
      .then(() => {
        console.log('-----[加入房间成功]-----', '房间:', roomId);
      })
      .catch((error) => {
        console.log('------[加入房间失败]-----', error);
      });
  };

  const addListens = () => {
    /**
     * remote用户加入房间 onJoin
     * 更新在线用户列表
     */
    aliWebrtc.on('onJoin', (publisher) => {
      console.log('onJoin', '房间加入新用户:', publisher);
      if (publisher.userId) {
        updateUserList();
      }
      // 重置订阅状态
      // 默认订阅远端音频和视频大流，但需要调用subscribe才能生效
      // 这里取消默认订阅，根据需求进行订阅
      aliWebrtc.configRemoteAudio(publisher.userId, false);
      aliWebrtc.configRemoteCameraTrack(publisher.userId, false, false);
      // showAlert(publisher.displayName + "加入房间","success");
      console.log(`${publisher.displayName} 加入房间`);
    });
    /**
     * remote流发布事件 onPublish
     * 将该用户新增到推流列表
     * 若该用户已存在推流列表，则进行状态更新
     */
    aliWebrtc.on('onPublisher', () => {});

    /**
     * remote流结束发布事件 onUnPublisher
     * 推流列表删除该用户
     * 移除用户视图
     * 初始化订阅状态
     */
    aliWebrtc.on('onUnPublisher', () => {});

    /**
     * 被服务器踢出或者频道关闭时回调 onBye
     */
    aliWebrtc.on('onBye', (message) => {
      // 1:被服务器踢出
      // 2:频道关闭
      // 3:同一个ID在其他端登录,被服务器踢出
      let msg;
      switch (message.code) {
        case 1:
          msg = '被服务器踢出';
          break;
        case 2:
          msg = '频道关闭';
          break;
        case 3:
          msg = '同一个ID在其他端登录,被服务器踢出';
          break;
        default:
          msg = 'onBye';
      }
      Msg.warn(msg, 'danger');
    });

    /**
     *  错误信息
     */
    aliWebrtc.on('onError', () => {});

    /**
     * 检测到用户离开频道
     * 更新用户列表
     * 移除用户视图
     */
    aliWebrtc.on('onLeave', (publisher) => {
      initialization(aliWebrtc, publisher.userId);
      updateUserList();
    });
  };

  // 打开/关闭预览
  const switchPreview = (falg) => {
    if (falg) {
      // 1.打开预览
      aliWebrtc
        .startPreview(videoDom)
        .then((obj) => {
          setPreviewVisib(falg);
          console.log(`-----[开启预览成功]，预览信息`, obj);
        })
        .catch((error) => {
          console.log(`-----[开启预览失败]" + ${error.message}`);
        });
    } else {
      aliWebrtc
        .stopPreview()
        .then(() => {
          setPreviewVisib(falg);
        })
        .catch((error) => {
          console.log(`-----[关闭预览失败]" + ${error.message}`);
        });
    }
  };

  /**
   * 更新在线用户列表
   */
  const updateUserList = () => {
    const userList_ = aliWebrtc.getUserList();
    console.log('刷新房间用户列表', userList_);
    setUserList(userList_);
  };

  // 订阅
  const subscr = (user) => {
    receivePublishManual(user).then(() => {
      console.log('[订阅成功]');
      if (user.label !== 'sophon_video_screen_share') {
        aliWebrtc.setDisplayRemoteVideo(user.userId, videoDom, 1);
      } else {
        aliWebrtc.setDisplayRemoteVideo(user.userId, videoDom, 2);
      }
    });
  };

  /**
   * 订阅设置
   */
  const receivePublishManual = (v) => {
    console.log('receivePublishManual订阅', v);
    return new Promise((resolve, reject) => {
      if (v.label === 'sophon_video_camera_large') {
        console.log('订阅固定视频流');
        aliWebrtc.configRemoteCameraTrack(v.userId, true, true);
        aliWebrtc.configRemoteAudio(v.userId, true);
      } else if (v.label === 'sophon_video_screen_share') {
        console.log('订阅屏幕共享流');
        aliWebrtc.configRemoteScreenTrack(v.userId, true);
      }
      aliWebrtc
        .subscribe(v.userId)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
          console.log(`[subscribe失败] ${error.message}`);
        });
    });
  };

  return (
    <div className={SS.root}>
      {loginVisib && (
        <div className={SS.login}>
          <div className={SS.main}>
            <div className={SS.mainTitle}>
              <span>音视频通信</span>
            </div>
            <div className={SS.mainInput}>
              <Input
                placeholder="请输入房间号"
                onChange={(e) => setChannelId(e.target.value)}
              />
            </div>
            <div className={SS.button}>
              <button type="button" onClick={startRoom}>
                开启房间
              </button>
            </div>

            <div className={SS.jionInput}>
              <Input
                placeholder="请输入房间号"
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
            <div className={SS.button}>
              <button type="button" onClick={attendeeStartRoom}>
                加入房间
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`${SS.etc} ${loginVisib ? SS.hide : ''}`}>
        <div className={SS.userList}>
          <div>房间成员</div>
          <ul>
            {userList.map((el) => (
              <li key={el.userId} onClick={() => subscr(el)}>
                {el.displayName}
              </li>
            ))}
          </ul>
        </div>
        <Live
          setVideo={setVideoDom}
          camera={previewVisib}
          startLive={startLive}
          switchCamera={() => {
            switchPreview(!previewVisib);
          }}
        />
        {/* <Meeting
          setVideo={setVideoDom}
          camera={previewVisib}
          switchCamera={() => {
            switchPreview(!previewVisib);
          }}
        /> */}
      </div>
    </div>
  );
}

export default EtcDemo;
