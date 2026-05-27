import { Routes } from '@angular/router';
import { Principal } from './tela-principal/principal/principal';
import { Cadastro } from './tela-principal/tela-cadastro/cadastro/cadastro';
import { Login } from './tela-principal/tela-login/login/login';
import { EcoEnergy } from './tela-principal/eco-energy/eco-energy';
import { Home } from './tela-principal/home/home';
import { RelatoriosComponent } from './tela-principal/relatorios-component/relatorios-component';

export const routes: Routes = [
  {
    path: '',
    component: Cadastro
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'principal',
    component: Principal,

    children:[

      {
        path: '',
        component: Home
      },

      {
        path: 'ecoEnergy',
        component: EcoEnergy

    },
      {
        path: 'relatorios',
        component: RelatoriosComponent
      }

    ]

  }
];
