const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '地产信息',
    path: '/',
    icon: 'chart-pie',
    children: [
      {
        name: '销售信息展示',
        path: '/guest/guestPay',
      },
      {
        name: '房屋售价信息',
        path: '/guest/priceinfo',
      },
    ]
  },
  {
    name: '匿名投诉箱',
    path: '/guest/complain',
    icon: 'chart-pie',
  },
  {
    name: '业主委员会',
    path: '/guest/meeting',
    icon: 'chart-pie',
  },
  {
    name: '个人欠费管理',
    path: '/guest/userowe',
    icon: 'chart-pie',
  },
  {
    name: '登录&注册',
    path: '/',
    icon: 'account',
    children: [
      {
        name: '登录',
        path: '/user/login',
      },
      {
        name: '注册',
        path: '/user/register',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
