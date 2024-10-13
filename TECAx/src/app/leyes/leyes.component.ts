import { Component } from '@angular/core';

interface Informacion {
  id: number;
  tipo: number;
  titulo: string;
  descripcion: string;
  nombrerecurso: string;
  linkrecurso: string;
  descripcionrecurso: string;
};

@Component({
  selector: 'app-leyes',
  standalone: true,
  imports: [],
  templateUrl: './leyes.component.html',
  styleUrl: './leyes.component.css'
})

export class LeyesComponent {
  info: Informacion[] = [];
  infoGeneral: Informacion[] = [];
  enlaces: Informacion[] = [];

  constructor() {}

  async ngOnInit() {
    await fetch('http://localhost:8080/normas/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.info = data;
        this.infoGeneral = this.info.filter ((item: Informacion) => item.nombrerecurso === null );
        this.enlaces = this.info.filter((item: Informacion) => item.nombrerecurso !== null && item.nombrerecurso !== '');
        console.log(this.info.map((info: Informacion) => info.titulo));
      });
  }
}
