import Taro from '@tarojs/taro';
import { Component } from 'react'
import './app.less'

class App extends Component {
  async onLaunch() {
    // 这里可处理一些混入逻辑
    // doSomethingMixin();
    /**
     * 检测当前的小程序是否需要下载、更新
     */
    // 判断微信版本是否兼容小程序更新机制API的使用
    if (Taro.canIUse('getUpdateManager')) {
      //创建 UpdateManager 实例
      const updateManager = Taro.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate(function (res) {
        console.log('是否有新版本', res.hasUpdate);
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(async function () {
            console.log('新版本下载成功');
            // 静默更新：新的版本已经下载好，下次冷启动时会自动加载新版本，不需要回调
            // 强制更新：调用applyUpdate()，小程序弹出弹窗“小程序需要重启以使用该功能”，点击“知道了”会启用新版
            // const miniProgram = wx.getAccountInfoSync().miniProgram;
            // console.log("miniProgram", miniProgram);
            // miniProgram.version === "9.9.9"
            Taro.showModal({
              title: '更新提示',
              content: '新版本已经下载完毕，是否立即启用？',
              showCancel: false,
              success(resp) {
                if (resp.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            console.log('新版本下载失败');
          });
        }
      });
    } else {
      // 此时微信版本太低（一般而言版本都是支持的）
      Taro.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
