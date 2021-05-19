const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '房屋资料显示',
    path: '/houseinfo',
    icon: 'chart-pie',
  },
  {
    name: '房屋维修管理',
    path: '/houserepair',
    icon: 'copy',
  },
  {
    name: '绿化工作',
    path: '/greening',
    icon: 'chart-bar',
  },
  {
    name: '安保工作',
    path: '/securityguard',
    icon: 'calendar',
  },
  {
    name: '清洁工作',
    path: '/cleaning',
    icon: 'warning',
  },
  {
    name: '收费管理',
    path: '/paymanagement',
    icon: 'set',
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
