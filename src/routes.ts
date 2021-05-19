import { IRouterConfig } from 'ice';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import BasicLayout from '@/layouts/BasicLayout';
import HouseInfo from '@/pages/HouseInfo';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/houseinfo',
        component: HouseInfo,
      },
      {
        path: '/',
        redirect: '/houseinfo',
      },
    ],
  },
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
];
export default routerConfig;
