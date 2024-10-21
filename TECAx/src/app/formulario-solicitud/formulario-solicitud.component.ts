import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../servicios/sharedService';
import { app } from '../../../server';
import {
  EmailService
} from '../email.service';
interface ForRec {
  idUsuario: string;
  email: string;
  sede: string;
  fecha: string;
}

interface pregunta {
  idPregunta: number;
  respuesta: string;
  idFormulario?: number; // Add this line
}


@Component({
  selector: 'app-formulario-solicitud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.css']
})


export class FormularioSolicitudComponent {
  idFormulario ='';

  sedesTec: string[] = ['Cartago', 'San José', 'Alajuela', 'Limón', 'San Carlos'];

  formularioSolicitud = new FormGroup({
    'nombre': new FormControl('', [Validators.required]),
    'correo': new FormControl('', [Validators.required, Validators.email]),
    'cedula': new FormControl('', [Validators.required, this.validarCedula]),
    'servicio': new FormControl('', [Validators.required]),
    'horario': new FormControl('', [Validators.required]),
    'sede': new FormControl('', [Validators.required])
  });

  validarCedula(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!/^\d{9}$/.test(cedula)) { // Verifica si solo contiene números
        return {
            invalidCedula: true
        };
    }
    return null;
}
  constructor(public SharedService: SharedService,private emailService: EmailService) {
    this.formularioSolicitud.get('sede')?.setValue('');
  }
  crearMensaje(datos: any): string {
    let mensaje: string ='<h1 style="font-size: 20px; margin-bottom: 5px; color: black;">Datos de la solicitud</h1>' +
    '<span style="color: black;"><strong>Nombre Completo:</strong> ' + datos['nombre'] + '</span><br>' +
        '<span style="color: black;"><strong>Correo:</strong> ' + datos['correo'] + '</span><br>'+
        '<span style="color: black;"><strong>Cédula:</strong> ' + datos['cedula'] + '</span><br>'+
        '<span style="color: black;"><strong>Cuéntanos sobre el servicio o la ayuda que deseas recibir:</strong> ' + datos['servicio'] + '</span><br>'+
        '<span style="color: black;"><strong>Indique los días y las horas en los que le sea más fácil asistir a la reunión:</strong> ' + datos['horario'] + '</span><br>'+
        '<span style="color: black;"><strong>Sede:</strong> ' + datos['sede'] + '</span><br>';

   
    return mensaje;


}
  enviarCorreo(datos: any) {
      const to = datos['correo'] + "," + "crowdspark58@gmail.com";
      const subject = 'Solicitud de acompañamiento realizada por ' + datos['nombre'];
      const text = this.crearMensaje(datos);

      this.emailService.sendEmail(to, subject, text).subscribe(
          response => {
              console.log('Correo enviado con éxito:', response);

          },
          error => {
              console.error('Error al enviar el correo:', error);
          }
      );
  }
  async onSubmit() {
    if (this.formularioSolicitud.valid) {
      const formularioValores = this.formularioSolicitud.value;
      console.log('Formulario Valores:', formularioValores);

      const jsonResultado = JSON.stringify(formularioValores);
      console.log('Formulario en formato JSON:', jsonResultado);

      /*
      El campo horario se refiere a la pregunta
      Indique los días y las horas en los que le sea más fácil asistir a la reunión.

      El campo servicio a la pregunta
      Cuéntanos sobre el servicio o la ayuda que deseas recibir.
      */

      const forRec: ForRec = {
        idUsuario: formularioValores.cedula!,
        email: formularioValores.correo!,
        sede: formularioValores.sede!,
        fecha: formularioValores.horario!
      };

      let preguntas: pregunta[] = [
        {
          idPregunta: 22,
          respuesta: formularioValores.servicio!
        },
        {
          idPregunta: 23,
          respuesta: formularioValores.horario!
        }
      ];
      await fetch(SharedService.getBaseURL()+"/form/fr", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(forRec)
      }).then(response => response.json())
        .then(async (data) => {
          console.log('ID Formulario:', data.id);
          for (const pregunta of preguntas) {
            pregunta['idFormulario'] = data.id;
            console.log("Pregunta: ", JSON.stringify(pregunta));
            await fetch(SharedService.getBaseURL()+"/form/fp", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(pregunta)
            }).then(response => response.json())
              .then(d => {
                console.log(d);
              });
          }

        });
        this.enviarCorreo(formularioValores);
        alert('Formulario enviado.');
    } else {
      console.log('Formulario no válido');
      alert('Por favor, complete todos los campos correctamente antes de enviar el formulario.');
        
    }

  }
}
