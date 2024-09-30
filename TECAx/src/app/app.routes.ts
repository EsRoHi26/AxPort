import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { LeyesComponent } from './leyes/leyes.component';
import { SydComponent } from './syd/syd.component';
import { ProcessComponent } from './process/process.component';
import { RecComponent } from './rec/rec.component';

export const routes: Routes = [
  {path: 'info', component: InfoComponent},
  {path: 'leyes', component: LeyesComponent},
  {path: 'syd', component: SydComponent},
  {path: 'process', component: ProcessComponent},
  {path: 'rec', component: RecComponent},
  {path: '', redirectTo: '/info', pathMatch: 'full'}
];
