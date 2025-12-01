import { Routes } from '@angular/router';
import { Layout } from './template/layout/layout';
import { Loginpage } from './loginpage/loginpage';

export const routes: Routes = [
  {
    path: '',
    component: Loginpage,
  },
  {
    path: 'perfil',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./profile/profile').then(m => m.Profile),
      }
    ]
  },
  {
    path: 'home',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./homepage/homepage').then(m => m.Homepage),
      }
    ]
  },
  {
    path: 'admin',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./adminpage/adminpage').then(m => m.Adminpage),
      }
    ]
  },
  {
    path: 'acessos',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./accesspage/accesspage').then(m => m.Accesspage),
      }
    ]
  },
  {
    path: 'adicionaruser',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./adduserpage/adduserpage').then(m => m.Adduserpage),
      }
    ]
  },
  {
    path: 'editaruser',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./edituserpage/edituserpage').then(m => m.Edituserpage),
      }
    ]
  },
  {
    path: 'deletaruser',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./deleteuserpage/deleteuserpage').then(m => m.Deleteuserpage),
      }
    ]
  },
  {
    path: 'novasenha',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./newpassword/newpassword').then(m => m.Newpassword),
      }
    ]
  },
  {
    path: 'logs',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./logspage/logspage').then(m => m.Logspage),
      }
    ]
  },
  {
    path: 'adicionargrupo',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./addgrouppage/addgrouppage').then(m => m.Addgrouppage),
      }
    ]
  },
  {
    path: 'editargrupo',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./editgrouppage/editgrouppage').then(m => m.Editgrouppage),
      }
    ]
  },
  {
    path: 'deletargrupo',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./deletegrouppage/deletegrouppage').then(m => m.Deletegrouppage)
      }
    ]
  }
];
