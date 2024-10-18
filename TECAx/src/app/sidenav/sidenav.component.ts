import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../servicios/sharedService';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  constructor(public SharedService: SharedService) {}

  show(){
    return SharedService.isLogged();};

}
