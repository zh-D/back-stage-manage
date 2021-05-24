import { IRouterConfig } from 'ice';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import BasicLayout from '@/layouts/BasicLayout';
import EditHouseInfo from '@/pages/House/EditHouseInfo';
import AddHouseInfo from '@/pages/House/AddHouseInfo';
import EditRepaireInfo from '@/pages/Repaire/EditRepaireInfo';
import AddRepaireInfo from '@/pages/Repaire/AddRepaireInfo';
import EditGreeningInfo from '@/pages/Greening/EditGreeningInfo';
import AddGreeningInfo from '@/pages/Greening/AddGreeningInfo';
import EditGuardInfo from '@/pages/Guard/EditGuardInfo';
import AddGuardInfo from '@/pages/Guard/AddGuardInfo';
import EditCleaningInfo from '@/pages/Cleaning/EditCleaningInfo';
import AddCleaningInfo from '@/pages/Cleaning/AddCleaningInfo';
import EditPayInfo from '@/pages/Pay/EditPayInfo';
import AddPayInfo from '@/pages/Pay/AddPayInfo';

import LoginWrapper from '@/components/LoginWrapper';
import PageWrapper from '@/components/PageWrapper';


const routerConfig: IRouterConfig[] = [
  {
    path: '/user',
    component: UserLayout,
    wrappers: [LoginWrapper],
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
        exact: true,
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    wrappers: [PageWrapper],
    children: [
      {
        path: '/house/houseinfo',
        component: EditHouseInfo,
      },
      {
        path: '/house/addhouseinfo',
        component: AddHouseInfo,
      },
      {
        path: '/repaire/repaireinfo',
        component: EditRepaireInfo,
      },
      {
        path: '/repaire/addrepaireinfo',
        component: AddRepaireInfo,
      },
      {
        path: '/greening/greeninginfo',
        component: EditGreeningInfo,
      },
      {
        path: '/greening/addgreeninginfo',
        component: AddGreeningInfo,
      },
      {
        path: '/guard/guardinfo',
        component: EditGuardInfo,
      },
      {
        path: '/guard/addguardinfo',
        component: AddGuardInfo,
      },
      {
        path: '/cleaning/cleaninginfo',
        component: EditCleaningInfo,
      },
      {
        path: '/cleaning/addcleaninginfo',
        component: AddCleaningInfo,
      },
      {
        path: '/paymanagement/payinfo',
        component: EditPayInfo,
      },
      {
        path: '/paymanagement/addpayinfo',
        component: AddPayInfo,
      },
      {
        path: '/',
        redirect: '/house/houseinfo',
      },
    ],
  },
];
export default routerConfig;
