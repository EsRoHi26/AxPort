import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../servicios/sharedService';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

  constructor(public SharedService: SharedService) {}

  show(){
    return SharedService.isLogged();};
}
