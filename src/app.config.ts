let envConfig = {};

if (process.env.TARO_ENV === 'weapp') {
  envConfig = {
    pages: [
      'pages/home/index',
      'pages/activity/index',
      'pages/product/index',
      'pages/userPage/index'
    ],
    subPackages: [
      {
        root: 'subPages',
        pages: [
          'pages/user/aboutUs/index',
          'pages/user/userDetail/index',
        ]
      }
    ],
    tabBar: {
      color: '#333333',
      selectedColor: '#004AA0',
      list: [
        {
          iconPath: './assets/tabbar/tabbar-icon-home-default.png',
          selectedIconPath: './assets/tabbar/tabbar-icon-home-selected.png',
          pagePath: 'pages/home/index',
          text: '首页'
        },
        {
          iconPath: './assets/tabbar/tabbar-icon-dianjian-default.png',
          selectedIconPath: './assets/tabbar/tabbar-icon-dianjian-selected.png',
          pagePath: 'pages/activity/index',
          text: '活动'
        },
        {
          iconPath: './assets/tabbar/tabbar-icon-dingdan-default.png',
          selectedIconPath: './assets/tabbar/tabbar-icon-dingdan-selected.png',
          pagePath: 'pages/product/index',
          text: '产品列表'
        },
        {
          iconPath: './assets/tabbar/tabbar-icon-wode-default.png',
          selectedIconPath: './assets/tabbar/tabbar-icon-wode-selected.png',
          pagePath: 'pages/userPage/index',
          text: '我的'
        }
      ]
    },
    plugins: {},
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      },
      'scope.writePhotosAlbum': {
        desc: '添加到相册'
      },
      'scope.camera': {
        desc: '打开摄像头'
      }
    },
    requiredPrivateInfos: ['getLocation'],
    lazyCodeLoading: 'requiredComponents' // 页面及自定义组件按需注入
  };
}

// h5端仅编译以下页面，最好放在独立的分包目录中
if (process.env.TARO_ENV === 'h5') {
  envConfig = {
    pages: ['/pages/activity/index']
  };
}

export default {
  ...envConfig,
  window: {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
};

