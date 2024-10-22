import { Component } from '@angular/core';
import { SharedService } from '../../servicios/sharedService';
import { share } from 'rxjs';

interface res {
  pregunta: string;
  respuesta: string;
}
interface Solicitud {
  id: number;
  correo: string;
  cedula: string;
  sede: string;
  fecha: string;
  tipo?: string;
  form: res[];
}

@Component({
  selector: 'app-sol-pen',
  standalone: true,
  imports: [],
  templateUrl: './sol-pen.component.html',
  styleUrl: './sol-pen.component.css'
})
export class SolPenComponent {

  constructor(public SharedService: SharedService) { }

  solicitudesPendientes: Solicitud[] = [];
  denunciasPendientes: Solicitud[] = [];

  async ngOnInit() {
    this.solicitudesPendientes = [];
    this.denunciasPendientes = [];

    try {
      await fetch(SharedService.baseURL + '/form/solicitud', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(response => response.json())
        .then(data => {
          data.forEach((den: any) => {
            let temp: Solicitud = {
              id: -1,
              correo: "",
              cedula: "",
              sede: "",
              fecha: "",
              form: []
            };
            console.log("den: ", JSON.stringify(den));
            if (this.solicitudesPendientes[this.solicitudesPendientes.length - 1] && this.solicitudesPendientes[this.solicitudesPendientes.length - 1].id == den.id) {
              this.solicitudesPendientes[this.solicitudesPendientes.length - 1].form.push({ pregunta: den.pregunta, respuesta: den.respuesta });
            }
            else {
              temp.id = den.id;
              temp.correo = den.email;
              temp.cedula = den.idusuario;
              temp.sede = den.sede;
              temp.fecha = den.fecha;
              temp.form.push({ pregunta: den.pregunta, respuesta: den.respuesta });
              console.log("temp: ", JSON.stringify(temp));
              this.solicitudesPendientes.push(temp);
            }
          });
          //console.log("temp: ", JSON.stringify(temp));
          //this.solicitudesPendientes.push(temp);
          console.log(this.solicitudesPendientes.map((den: any) => den));
        });
    } catch (e) {
      console.log(e);
    }

    try {
      await fetch(SharedService.baseURL + '/form/denuncia', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          data.forEach((den: any) => {
            let temp: Solicitud = {
              id: -1,
              correo: "",
              cedula: "",
              sede: "",
              fecha: "",
              form: []
            };
            console.log("den: ", JSON.stringify(den));
            if (this.denunciasPendientes[this.denunciasPendientes.length - 1] && this.denunciasPendientes[this.denunciasPendientes.length - 1].id == den.id) {
              this.denunciasPendientes[this.denunciasPendientes.length - 1].form.push({ pregunta: den.pregunta, respuesta: den.respuesta });
            }
            else {
              temp.id = den.id;
              temp.correo = den.email;
              temp.cedula = den.idusuario;
              temp.sede = den.sede;
              temp.fecha = den.fecha;
              temp.form.push({ pregunta: den.pregunta, respuesta: den.respuesta });
              console.log("temp: ", JSON.stringify(temp));
              this.denunciasPendientes.push(temp);
            }
          });
          console.log(this.denunciasPendientes.map((den: any) => den));
        });
    } catch (e) {
      console.log(e);
    }
  }

  async borrar(id:string){
    await fetch(SharedService.baseURL + '/form/delete/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }


}
