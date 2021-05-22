const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '房屋资料',
    path: '/',
    icon: 'chart-pie',
    children: [
      {
        name: '房屋资料管理',
        path: '/house/houseinfo',
      },
      {
        name: '添加房屋资料',
        path: '/house/addhouseinfo',
      },
    ]
  },
  {
    name: '房屋维修管理',
    path: '/',
    icon: 'copy',
    children: [
      {
        name: '维修信息管理',
        path: '/repaire/repaireinfo',
      },
      {
        name: '添加维修信息',
        path: '/repaire/addrepaireinfo',
      },
    ]
  },
  {
    name: '绿化工作',
    path: '/',
    icon: 'chart-bar',
    children: [
      {
        name: '绿化信息管理',
        path: '/greening/greeninginfo',
      },
      {
        name: '添加绿化信息',
        path: '/greening/addgreeninginfo',
      },
    ]
  },
  {
    name: '安保工作',
    path: '/',
    icon: 'calendar',
    children: [
      {
        name: '安保信息管理',
        path: '/guard/guardinfo',
      },
      {
        name: '添加安保信息',
        path: '/guard/addguardinfo',
      },
    ]
  },
  {
    name: '清洁工作',
    path: '/',
    icon: 'warning',
    children: [
      {
        name: '清洁信息管理',
        path: '/cleaning/cleaninginfo',
      },
      {
        name: '添加清洁信息',
        path: '/cleaning/addcleaninginfo',
      },
    ]
  },
  {
    name: '收费管理',
    path: '/pay',
    icon: 'set',
    children: [
      {
        name: '收费信息管理',
        path: '/paymanagement/payinfo',
      },
      {
        name: '添加收费信息',
        path: '/paymanagement/addpayinfo',
      },
    ]
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
