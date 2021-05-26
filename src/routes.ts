import { IRouterConfig } from 'ice';
// User/Login
import UserLayout from '@/layouts/UserLayout';
import LoginWrapper from '@/components/LoginWrapper';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
// Admin
import AdminLayout from '@/layouts/AdminLayout';
import AdminWrapper from '@/components/AdminWrapper';
import Building from '@/pages/Building';
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
import GetPayInfo from '@/pages/Pay/GetPayinfo';
import Remindinfo from '@/pages/Remindinfo/remind';
import DocuMan from '@/pages/DocuMan';
// Guest
import GuestLayout from '@/layouts/GuestLayout';
import GuestWrapper from '@/components/GuestWrapper';
import Complain from '@/pages/Complain';
import GuestPay from '@/pages/GuestPay';
import Priceinfo from '@/pages/Priceinfo';
import Meeting from '@/pages/Meeting';
import UserOwe from '@/pages/UserOwe';


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
    path: '/admin',
    component: AdminLayout,
    wrappers: [AdminWrapper],
    children: [
      {
        path: '/building',
        component: Building,
      },
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
        path: '/paymanagement/getpayinfo',
        component: GetPayInfo,
      },
      {
        path: '/remindinfo',
        component: Remindinfo,
      },
      {
        path: '/documan',
        component: DocuMan,
      },
    ],
  },
  {
    path: '/guest',
    component: GuestLayout,
    wrappers: [GuestWrapper],
    children: [
      {
        path: '/complain',
        component: Complain,
      },
      {
        path: '/guestPay',
        component: GuestPay,
      },
      {
        path: '/priceinfo',
        component: Priceinfo,
      },
      {
        path: '/meeting',
        component: Meeting,
      },
      {
        path: '/userowe',
        component: UserOwe,
      },
    ],
  },
  {
    path: '/',
    redirect: '/user/login',
  },
];
export default routerConfig;
