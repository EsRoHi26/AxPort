import { Component } from '@angular/core';
import { SharedService } from '../../servicios/sharedService';
import { CommonModule } from '@angular/common';
interface Recurso {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  url: string;
  descripcionimagen: string;
  idfromulario: string;
  tipo: string;
};

@Component({
  selector: 'app-rec',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rec.component.html',
  styleUrl: './rec.component.css'
})
export class RecComponent {

  constructor(public SharedService:SharedService) {}

  recursos:Recurso[] = [];

  async ngOnInit() {
    await fetch(SharedService.baseURL+'/rec/all',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      this.recursos = data;
      console.log(this.recursos.map((rec:Recurso) => rec.nombre));
      console.log(this.recursos)
    });
  }

}
