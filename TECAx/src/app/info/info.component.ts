import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Informacion {
  id: number;
  tipo: number;
  titulo: string;
  descripcion: string;
  nombrerecurso: string;
  linkrecurso: string;
  descripcionrecurso: string;
};

interface Miembros {
  id: number;
  nombre: string;
  sede: string;
  email: string;
  telefono: string;
};

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})

export class InfoComponent {

  info: Informacion[] = [];
  infoGeneral: Informacion[] = [];
  listaPunto: Informacion[] = [];
  listaImg: Informacion[] = [];
  infoTabla: Informacion[] = [];
  tabla: Miembros[] = [];

  noticias: Informacion[] = [];
  

  listasPuntos: { [titulo: string]: Informacion[] } = {};
  listasImg: { [titulo: string]: Informacion[] } = {};

  constructor() {}

  async ngOnInit() {
    await fetch('http://localhost:8080/info/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.info = data;
        console.log(this.info.map((info: Informacion) => info.descripcion));

        this.infoGeneral = this.info.filter(q => q.tipo === 1);
        this.listaPunto = this.info.filter(q => q.tipo === 2);
        this.listaImg = this.info.filter(q => q.tipo === 3);
        this.infoTabla = this.info.filter(q => q.tipo === 4);
        this.noticias = this.info.filter(q => q.tipo === 5);

        this.listaPunto.forEach(item => {
          if (!this.listasPuntos[item.titulo]) {
            this.listasPuntos[item.titulo] = [];
          }
          this.listasPuntos[item.titulo].push(item);
        });

        this.listaImg.forEach(item => {
          if (!this.listasImg[item.titulo]) {
            this.listasImg[item.titulo] = [];
          }
          this.listasImg[item.titulo].push(item);
        });

      });

      await fetch('http://localhost:8080/miem/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          this.tabla = data;
          console.log(this.tabla.map((tabla: Miembros) => tabla.sede));  
        });
  }

  getTitulosListasPuntos(): string[] {
    return Object.keys(this.listasPuntos);
  }

  getTitulosListasImg(): string[] {
    return Object.keys(this.listasImg);
  }
}
