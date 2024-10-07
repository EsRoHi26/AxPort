import { Component } from '@angular/core';

interface Recurso {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  url: string;
  idfromulario: string;
};

@Component({
  selector: 'app-rec',
  standalone: true,
  imports: [],
  templateUrl: './rec.component.html',
  styleUrl: './rec.component.css'
})
export class RecComponent {

  constructor() {}

  recursos:Recurso[] = [];

  async ngOnInit() {
    await fetch('http://localhost:8080/rec/all',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      this.recursos = data;
      console.log(this.recursos.map((rec:Recurso) => rec.nombre));
    });
  }

}
