import { IRouterConfig } from 'ice';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import BasicLayout from '@/layouts/BasicLayout';
import HouseInfo from '@/pages/HouseInfo';
import AddHouseInfo from '@/pages/HouseInfo/AddHouseInfo';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/house/houseinfo',
        component: HouseInfo,
      },
      {
        path: '/house/addhouseinfo',
        component: AddHouseInfo,
      },
      {
        path: '/',
        redirect: '/house/houseinfo',
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
