import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { LeyesComponent } from './leyes/leyes.component';
import { SydComponent } from './syd/syd.component';
import { ProcessComponent } from './process/process.component';
import { RecComponent } from './rec/rec.component';
import { FormularioDenunciaComponent } from './formulario-denuncia/formulario-denuncia.component';
import { FormularioSolicitudComponent } from './formulario-solicitud/formulario-solicitud.component';
import { LoginComponent } from './login/login.component';
import { ModRecComponent } from './mod-rec/mod-rec.component';
import { ModNotComponent } from './mod-not/mod-not.component';
import { SolPenComponent } from './sol-pen/sol-pen.component';

export const routes: Routes = [
  {path: 'info', component: InfoComponent},
  {path: 'leyes', component: LeyesComponent},
  {path: 'syd', component: SydComponent},
  {path: 'process', component: ProcessComponent},
  {path: 'rec', component: RecComponent},
  {path: 'formulario-denuncia', component: FormularioDenunciaComponent},
  {path: 'formulario-solicitud', component: FormularioSolicitudComponent},
  {path: 'login', component: LoginComponent},
  {path: 'solPen', component: SolPenComponent},
  {path: 'modRec', component: ModRecComponent},
  {path: 'modNot', component: ModNotComponent},
  {path: '', redirectTo: '/info', pathMatch: 'full'}
];
