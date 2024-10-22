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
    try {
      await fetch(SharedService.baseURL + '/form/solicitud', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(response => response.json())
        .then(data => {
          const temp: Solicitud = {
            id: data[0].id,
            correo: data[0].email,
            cedula: data[0].idusuario,
            sede: data[0].sede,
            fecha: data[0].fecha,
            form: []
          };
          data.map((den: any) => {
            if (temp.id == den.id) {
              temp.form.push({ pregunta: den.pregunta, respuesta: den.respuesta });
            }
            else {
              this.solicitudesPendientes.push(temp);
              temp.id = den.id;
              temp.correo = den.correo;
              temp.cedula = den.cedula;
              temp.sede = den.sede;
              temp.fecha = den.fecha;
            }
          });
          this.solicitudesPendientes.push(temp);
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
          const temp: Solicitud = {
            id: data[0].id,
            correo: data[0].email,
            cedula: data[0].idusuario,
            sede: data[0].sede,
            fecha: data[0].fecha,
            form: []
          };
          data.map((den: any) => {
            if (temp.id == den.id) {
              temp.form.push({ pregunta: den.pregunta, respuesta: den.respuesta });
            }
            else {
              this.denunciasPendientes.push(temp);
              temp.id = den.id;
              temp.correo = den.correo;
              temp.cedula = den.cedula;
              temp.sede = den.sede;
              temp.fecha = den.fecha;
            }
          });
          this.denunciasPendientes.push(temp);
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
