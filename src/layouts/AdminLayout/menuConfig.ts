const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '楼盘资料',
    path: '/admin/building',
    icon: 'chart-pie',
  },
  {
    name: '房屋资料',
    path: '/',
    icon: 'chart-pie',
    children: [
      {
        name: '房屋资料管理',
        path: '/admin/house/houseinfo',
      },
      {
        name: '添加房屋资料',
        path: '/admin/house/addhouseinfo',
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
        path: '/admin/repaire/repaireinfo',
      },
      {
        name: '添加维修信息',
        path: '/admin/repaire/addrepaireinfo',
      },
    ]
  },
  {
    name: '小区环境管理',
    path: '/',
    icon: 'chart-bar',
    children: [
      {
        name: '绿化信息管理',
        path: '/admin/greening/greeninginfo',
      },
      {
        name: '添加绿化信息',
        path: '/admin/greening/addgreeninginfo',
      },
      {
        name: '清洁信息管理',
        path: '/admin/cleaning/cleaninginfo',
      },
      {
        name: '添加清洁信息',
        path: '/admin/cleaning/addcleaninginfo',
      },
    ]
  },
  {
    name: '日常事务',
    path: '/',
    icon: 'calendar',
    children: [
      {
        name: '安保信息管理',
        path: '/admin/guard/guardinfo',
      },
      {
        name: '添加安保信息',
        path: '/admin/guard/addguardinfo',
      },
    ]
  },
  {
    name: '收费管理',
    path: '/',
    icon: 'set',
    children: [
      {
        name: '收费信息管理',
        path: '/admin/paymanagement/payinfo',
      },
      {
        name: '添加收费信息',
        path: '/admin/paymanagement/addpayinfo',
      },
      {
        name: '收费信息查询',
        path: '/admin/paymanagement/getpayinfo',
      },
    ]
  },
  {
    name: '人事档案',
    path: '/admin/documan',
    icon: 'chart-pie',
  },
  {
    name: '客户投诉',
    path: '/admin/remindinfo',
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
