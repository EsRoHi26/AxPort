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

  ngOnInit() {
    const savedStyle = localStorage.getItem('bodyStyle');
    if (savedStyle) {
      document.body.className = savedStyle;
    }
  }

  show(){
    return SharedService.isLogged();};

  changeStyle(style: string, event: Event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    document.body.className = style;
    localStorage.setItem('bodyStyle', style);
  }
  
}