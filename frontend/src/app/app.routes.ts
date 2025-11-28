import { Routes } from '@angular/router';
import { Home } from './home/home'; // Importa la classe dal tuo file
import {Register} from './register/register'
import {Login} from './login/login'
// Correggi l'import usando il nome esatto della classe
import { JoinLega } from './join-lega/join-lega';
import {CreaLega} from './crea-lega/crea-lega';

export const routes: Routes = [
  { path: '', component: Home },
  { path:'register', component: Register},
   {path: 'login', component:Login},
  {path:'join-lega',component: JoinLega},
  {path:'crea-lega',component: CreaLega}
];
