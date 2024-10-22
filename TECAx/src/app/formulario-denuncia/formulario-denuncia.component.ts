import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../email.service';
import { SharedService } from '../../servicios/sharedService';

interface ForRec {
  idUsuario: string;
  email: string;
  sede: string;
  fecha: string;
  resouestas: string;
  tipousuario: string;
}

interface pregunta {
  idPregunta: number;
  respuesta: string;
  idFormulario?: number; // Add this line
}

@Component({
  selector: 'app-formulario-denuncia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-denuncia.component.html',
  styleUrl: './formulario-denuncia.component.css'
})
export class FormularioDenunciaComponent {
  sedesTec: string[] = ['Cartago', 'San José', 'Alajuela', 'Limón', 'San Carlos'];
  roles: string[] = ['Estudiante', 'Funcionario', 'Visitante'];
  mensajeAlerta: string = '';

  constructor(private emailService: EmailService, public SharedService: SharedService) {
    this.formularioDenuncia.get('rol')?.setValue('');
    this.formularioDenuncia.get('sede')?.setValue('');
    this.formularioDenuncia.get('rol')?.valueChanges.subscribe(value => {
      if (value === 'Estudiante') {
        this.formularioDenuncia.get('carrera')?.setValidators([Validators.required]);
        this.formularioDenuncia.get('carne')?.setValidators([Validators.required, this.validarCarne]);

        this.formularioDenuncia.get('dependencia')?.clearValidators();
        this.formularioDenuncia.get('cedula')?.clearValidators();
      } else if (value === 'Funcionario' || value === 'Visitante') {
        this.formularioDenuncia.get('dependencia')?.setValidators([Validators.required]);
        this.formularioDenuncia.get('cedula')?.setValidators([Validators.required, this.validarCedula]);

        this.formularioDenuncia.get('carrera')?.clearValidators();
        this.formularioDenuncia.get('carne')?.clearValidators();
      } else {
        this.formularioDenuncia.get('carrera')?.clearValidators();
        this.formularioDenuncia.get('carne')?.clearValidators();
        this.formularioDenuncia.get('dependencia')?.clearValidators();
        this.formularioDenuncia.get('cedula')?.clearValidators();
      }

      // Actualizar la validez de los campos
      this.formularioDenuncia.get('carrera')?.updateValueAndValidity();
      this.formularioDenuncia.get('carne')?.updateValueAndValidity();
      this.formularioDenuncia.get('dependencia')?.updateValueAndValidity();
      this.formularioDenuncia.get('cedula')?.updateValueAndValidity();
      this.formularioDenuncia.get('rol')?.valueChanges.subscribe(value => {
        this.formularioDenuncia.updateValueAndValidity();
      });
    });
  }
  formularioDenuncia = new FormGroup({
    'rol': new FormControl('', [Validators.required]),
    'nombre': new FormControl('', [Validators.required]),
    'dependencia': new FormControl(''),
    'carrera': new FormControl(''),
    'correo': new FormControl('', [Validators.required, Validators.email]),
    'cedula': new FormControl(''),
    'carne': new FormControl(''),
    'sede': new FormControl('', [Validators.required]),
    'si': new FormControl(false),
    'no': new FormControl(false),
    'si2': new FormControl(false),
    'no2': new FormControl(false),
    'si3': new FormControl(false),
    'no3': new FormControl(false),
    'ambiente': new FormControl(false),
    'informacion': new FormControl(false),
    'tecnologias': new FormControl(false),
    'servicios': new FormControl(false),
    'actitudinal': new FormControl(false),
    'CAIS': new FormControl(false),
    'CISO': new FormControl(false),
    'caja': new FormControl(false),
    'seguros': new FormControl(false),
    'otroCheckbox': new FormControl(false),
    'otroCasilla': new FormControl(''),
    'motivo': new FormControl(''),
    'descripcion': new FormControl('')
  }, {
    validators: [this.alMenosUnaOpcionSeleccionada, this.alMenosUnaOpcionSeleccionada2,
    this.alMenosUnaOpcionSeleccionada3, this.alMenosUnaOpcionSeleccionadaArea, this
      .alMenosUnaOpcionSeleccionadaAcompañamiento
    ]
  });

  alMenosUnaOpcionSeleccionada(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const si = formGroup.get('si')?.value;
    const no = formGroup.get('no')?.value;
    const rol = formGroup.get('rol')?.value;
    if (rol === 'Estudiante') {
      return si || no ? null : {
        ningunaSeleccionada: true
      };
    } else return null;
  }
  alMenosUnaOpcionSeleccionada2(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const si = formGroup.get('si2')?.value;
    const no = formGroup.get('no2')?.value;
    const rol = formGroup.get('rol')?.value;
    if (rol === 'Estudiante') {
      return si || no ? null : {
        ningunaSeleccionada: true
      };
    } else return null;
  }
  alMenosUnaOpcionSeleccionada3(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const si = formGroup.get('si3')?.value;
    const no = formGroup.get('no3')?.value;
    const rol = formGroup.get('rol')?.value;
    if (rol === 'Funcionario') {
      return si || no ? null : {
        ningunaSeleccionada: true
      };
    } else return null;
  }
  alMenosUnaOpcionSeleccionadaArea(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const ambiente = formGroup.get('ambiente')?.value;
    const informacion = formGroup.get('informacion')?.value;
    const tecnologias = formGroup.get('tecnologias')?.value;
    const servicios = formGroup.get('servicios')?.value;
    const actitudinal = formGroup.get('actitudinal')?.value;

    return ambiente || informacion || tecnologias || servicios || actitudinal ? null : {
      ningunaSeleccionada: true
    };

  }
  alMenosUnaOpcionSeleccionadaAcompañamiento(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const CAIS = formGroup.get('CAIS')?.value;
    const CISO = formGroup.get('CISO')?.value;
    const caja = formGroup.get('caja')?.value;
    const seguros = formGroup.get('seguros')?.value;
    const otroCheckbox = formGroup.get('otroCheckbox')?.value;
    const otroTexto = formGroup.get('otroCasilla')?.value;
    const rol = formGroup.get('rol')?.value;
    if (rol === 'Funcionario') {
      if (otroCheckbox && otroTexto === '') {
        return {
          textoRequerido: true
        };
      } else {
        return CAIS || CISO || caja || seguros || otroCheckbox ? null : {
          ningunaSeleccionada: true
        };
      }
    } else return null;
  }

  validarCedula(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!/^\d{9}$/.test(cedula)) { // Verifica si solo contiene números
      return {
        invalidCedula: true
      };
    }
    return null;
  }
  validarCarne(control: AbstractControl): ValidationErrors | null {
    const carne = control.value;
    if (!/^\d{10}$/.test(carne)) { // Verifica si solo contiene números
      return {
        invalidCedula: true
      };
    }
    return null;
  }

  onCheckboxChange(selected: string) {
    if (selected === 'si') {
      this.formularioDenuncia.get('no')?.setValue(false); // Desmarcar 'no'
    } else if (selected === 'no') {
      this.formularioDenuncia.get('si')?.setValue(false); // Desmarcar 'si'
    }
  }

  desmarcarAreas(): void {
    const checkboxNames = ['ambiente', 'informacion', 'tecnologias', 'servicios', 'actitudinal'];

    checkboxNames.forEach(name => {
      this.formularioDenuncia.get(name)?.valueChanges.subscribe(value => {
        if (value) {
          checkboxNames.forEach(otherName => {
            if (otherName !== name) {
              this.formularioDenuncia.get(otherName)?.setValue(false, { emitEvent: false });
            }
          });
        }
      });
    });
  }
  onCheckboxChange2(selected: string) {
    if (selected === 'si') {
      this.formularioDenuncia.get('no2')?.setValue(false); // Desmarcar 'no'
    } else if (selected === 'no') {
      this.formularioDenuncia.get('si2')?.setValue(false); // Desmarcar 'si'
    }
  }
  onCheckboxChange3(selected: string) {
    if (selected === 'si') {
      this.formularioDenuncia.get('no3')?.setValue(false); // Desmarcar 'no'
    } else if (selected === 'no') {
      this.formularioDenuncia.get('si3')?.setValue(false); // Desmarcar 'si'
    }
  }
  crearMensaje(datos: any): string {
    /* Sección de datos personales */
    const rol = datos['rol'];
    let mensaje: string =
      '<h1 style="font-size: 20px; margin-bottom: 5px; color: black;">Datos personales</h1>' +
      '<span style="color: black;"><strong>Tipo:</strong> ' + datos['rol'] + '</span><br>' +
      '<span style="color: black;"><strong>Fecha:</strong> ' + datos['fecha'] + '</span><br>' +
      '<span style="color: black;"><strong>Nombre Completo:</strong> ' + datos['nombre'] + '</span><br>' +
      '<span style="color: black;"><strong>Correo:</strong> ' + datos['correo'] + '</span><br>';

    //Funcionario o visitante

    if (rol === 'Funcionario' || rol === 'Visitante') {
      mensaje += '<span style="color: black;"><strong>Dependencia:</strong> ' + datos['dependencia'] +
        '</span><br>' +
        '<span style="color: black;"><strong>Cédula:</strong> ' + datos['cedula'] + '</span><br>';
    }

    //Estudiante
    if (rol === 'Estudiante') {
      mensaje += '<span style="color: black;"><strong>Carrera:</strong> ' + datos['carrera'] + '</span><br>' +
        '<span style="color: black;"><strong>Carné:</strong> ' + datos['carne'] + '</span><br>';
    }

    /* Sección de marque con X */
    if (rol === 'Funcionario' || rol === 'Estudiante') {
      mensaje +=
        '<h1 style="font-size: 20px; margin-bottom: 5px; color: black;">Sección de marque con X</h1>';
    }
    //Estudiantes
    if (rol === 'Estudiante') {
      mensaje +=
        '<span style="color: black;"><strong>Recibió servicios y apoyo del Programa de Admisión Accesible para estudiantes con Discapacidad y Necesidades Educativas (para recibir apoyos en el examen de admisión):</strong> ' +
        datos['apoyo'] + '</span><br>' +
        '<span style="color: black;"><strong>Forma parte del Programa de Servicios para estudiantes con Discapacidad y Necesidades Educativas (PSED):</strong> ' +
        datos['formaParte'] + '</span><br>';
    }
    //Funcionarios
    if (rol === 'Funcionario') {
      mensaje +=
        '<span style="color: black;"><strong>Recibió servicios y apoyo del Programa Institucional de Equiparación de Oportunidades para Personas con Discapacidad del ITCR:</strong> ' +
        datos['apoyo'] + '</span><br>' +
        '<strong style="color: black;">Ha recibido acompañamiento de (puede marcar varias opciones):</strong><br>';
      if ('CAIS' in datos) {
        mensaje += '<span style="color: black;">- ' + datos['CAIS'] + '</span><br>';
      }
      if ('CISO' in datos) {
        mensaje += '<span style="color: black;">- ' + datos['CISO'] + '</span><br>';
      }
      if ('caja' in datos) {
        mensaje += '<span style="color: black;">- ' + datos['caja'] + '</span><br>';
      }
      if ('seguros' in datos) {
        mensaje += '<span style="color: black;">- ' + datos['seguros'] + '</span><br>';
      }
      if ('otro' in datos) {
        mensaje += '<span style="color: black;">-<strong> Otro: </strong>' + datos['otro'] + '</span><br>';
      }
    }
    /* Sección de denuncia */
    mensaje += '<h1 style="font-size: 20px; margin-bottom: 5px; color: black;">Sección de denuncia</h1>' +
      '<strong style="color: black;">Áreas por denunciar (según lo establece la ley 8661):</strong><br>';

    if ('ambiente' in datos) {
      mensaje += '<span style="color: black;">- ' + datos['ambiente'] + '</span><br>';
    }
    if ('informacion' in datos) {
      mensaje += '<span style="color: black;">- ' + datos['informacion'] + '</span><br>';
    }
    if ('tecnologias' in datos) {
      mensaje += '<span style="color: black;">- ' + datos['tecnologias'] + '</span><br>';
    }
    if ('servicios' in datos) {
      mensaje += '<span style="color: black;">- ' + datos['servicios'] + '</span><br>';
    }
    if ('actitudinal' in datos) {
      mensaje += '<span style="color: black;">- ' + datos['actitudinal'] + '</span><br>';
    }

    mensaje += '<span style="color: black;"><strong>Sede:</strong> ' + datos['sede'] + '</span><br>' +
      '<span style="color: black;"><strong>Motivo de la denuncia:</strong> ' + datos['motivo'] +
      '</span><br>' +
      '<span style="color: black;"><strong>Descripción de los aspectos o situación por denunciar:</strong> ' +
      datos['descripcion'] + '</span><br>';

    return mensaje;


  }
  enviarCorreo(datos: any) {
    const to = datos['correo'] + "," + "crowdspark58@gmail.com";
    const subject = 'Denuncia realizada por ' + datos['nombre'];
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

    if (this.formularioDenuncia.valid) {
      const datosFormulario: Record<string, any> = {
        rol: this.formularioDenuncia.get('rol')?.value, //¿Usted es?
        correo: this.formularioDenuncia.get('correo')?.value,
        nombre: this.formularioDenuncia.get('nombre')?.value,
        dependencia: this.formularioDenuncia.get('dependencia')?.value,
        fecha: new Date().toLocaleDateString('es-ES'),
        sede: this.formularioDenuncia.get('sede')?.value,
        motivo: this.formularioDenuncia.get('motivo')?.value, //Motivo de la denuncia
        descripcion: this.formularioDenuncia.get('descripcion')
          ?.value //Descripción de los aspectos o situación por denunciar (favor agregar la instancia, el lugar, descripción del servicio no brindado adecuadamente o si se trata de un aspecto actitudinal) :
      };
      /*Respuestas para la pregunta Áreas por denunciar
      (según lo establece la ley 8661):
      */
      const ambiente = this.formularioDenuncia.get('ambiente')?.value;
      const informacion = this.formularioDenuncia.get('informacion')?.value;
      const tecnologias = this.formularioDenuncia.get('tecnologias')?.value;
      const servicios = this.formularioDenuncia.get('servicios')?.value;
      const actitudinal = this.formularioDenuncia.get('actitudinal')?.value;

      if (ambiente) {
        datosFormulario["area"] = "Ambiente (infraestructura)";
      }

      if (informacion) {
        datosFormulario["area"] = "Información y Comunicación";
      }

      if (tecnologias) {
        datosFormulario["area"] = "Tecnologías de apoyo a la discapacidad";
      }

      if (servicios) {
        datosFormulario["area"] = "Servicios";
      }

      if (actitudinal) {
        datosFormulario["area"] = "Actitudinal (actitudes y acciones de personas)";
      }


      const rol = this.formularioDenuncia.get('rol')?.value;
      const dependencia = this.formularioDenuncia.get('dependencia')?.value;
      const carrera = this.formularioDenuncia.get('carrera')?.value;
      const cedula = this.formularioDenuncia.get('cedula')?.value;
      const carne = this.formularioDenuncia.get('carne')?.value;
      if (rol === 'Funcionario' || rol === 'Visitante') {
        datosFormulario["dependencia"] = dependencia;
        datosFormulario["cedula"] = cedula;
      }
      if (rol === 'Estudiante') {
        datosFormulario["carrera"] = carrera;
        datosFormulario["carne"] = carne;

        /*Responde a Recibió servicios y apoyo del Programa de Admisión Accesible
        para estudiantes con Discapacidad y Necesidades Educativas (para recibir
        apoyos en el examen de admisión):
        */
        const si = this.formularioDenuncia.get('si')?.value;
        if (si) {
          datosFormulario["apoyo1"] = "Sí";
        } else {
          datosFormulario["apoyo1"] = "No";
        }
        /*Responde a Forma parte del Programa de Servicios
         para estudiantes con Discapacidad y Necesidades Educativas (PSED):
        */
        const si2 = this.formularioDenuncia.get('si2')?.value;
        if (si2) {
          datosFormulario["formaParte"] = "Sí";
        } else {
          datosFormulario["formaParte"] = "No";
        }
      }
      if (rol === 'Funcionario') {
        /*Responde a Forma parte del Programa de Servicios
         para estudiantes con Discapacidad y Necesidades Educativas (PSED):
        */
        const si3 = this.formularioDenuncia.get('si3')?.value;
        if (si3) {
          datosFormulario["apoyo"] = "Sí";
        } else {
          datosFormulario["apoyo"] = "No";
        }

        /*Ha recibido acompañamiento de (puede marcar varias opciones):*/
        const CAIS = this.formularioDenuncia.get('CAIS')?.value;
        const CISO = this.formularioDenuncia.get('CISO')?.value;
        const caja = this.formularioDenuncia.get('caja')?.value;
        const seguros = this.formularioDenuncia.get('seguros')?.value;
        const otroCheckbox = this.formularioDenuncia.get('otroCheckbox')?.value;
        const otroCasilla = this.formularioDenuncia.get('otroCasilla')?.value;
        if (CAIS) {
          datosFormulario["acomp"] = "Clínica de Atención Integral en Salud (CAIS)";
        }

        if (CISO) {
          datosFormulario["acomp"] = "Comisión Institucional de Salud Ocupacional (CISO)";
        }

        if (caja) {
          datosFormulario["acomp"] = "Caja Costarricense de Seguro Social";
        }

        if (seguros) {
          datosFormulario["acomp"] = "Instituto Nacional de Seguros";
        }

        if (otroCheckbox) {
          datosFormulario["acomp"] = otroCasilla;
        }

      }
      let id = "";
      if (datosFormulario['rol'] === 'Estudiante') {
        id = datosFormulario['carne'];
      } else {
        id = datosFormulario['cedula'];
      }

      const fromRec: ForRec = {
        tipousuario: datosFormulario['rol'],
        idUsuario: id,
        email: datosFormulario['correo'],
        sede: datosFormulario['sede'],
        fecha: datosFormulario['fecha'],
        resouestas: "denuncia"
      };

      let preguntas: pregunta[] = [];

      if (datosFormulario['rol'] === 'Estudiante') {
        const temp: pregunta[] = [{
          idPregunta: 24,
          respuesta: datosFormulario['carrera']
        },
        {
          idPregunta: 29,
          respuesta: datosFormulario['apoyo1']
        },
        {
          idPregunta: 30,
          respuesta: datosFormulario['formaParte']
        },
        {
          idPregunta: 33,
          respuesta: datosFormulario['descripcion']
        },
        {
          idPregunta: 31,
          respuesta: datosFormulario['area']
        },
        {
          idPregunta: 32,
          respuesta: datosFormulario['motivo']
        }];
        preguntas = temp;
      } else if (datosFormulario['rol'] === 'Funcionario') {
          const temp: pregunta[] = [{
            idPregunta: 34,
            respuesta: datosFormulario['dependencia']
          },
          {
            idPregunta: 35,
            respuesta: datosFormulario['apoyo']
          },
          {
            idPregunta: 36,
            respuesta: datosFormulario['acomp']
          },
          {
            idPregunta: 33,
            respuesta: datosFormulario['descripcion']
          },
          {
            idPregunta: 31,
            respuesta: datosFormulario['area']
          },
          {
            idPregunta: 32,
            respuesta: datosFormulario['motivo']
          }];
          preguntas = temp;
        }else {
          const temp: pregunta[] = [{
            idPregunta: 33,
            respuesta: datosFormulario['descripcion']
          },
          {
            idPregunta: 31,
            respuesta: datosFormulario['area']
          },
          {
            idPregunta: 32,
            respuesta: datosFormulario['motivo']
          },
          {
            idPregunta: 34,
            respuesta: datosFormulario['dependencia']
          }];
          preguntas = temp;
        };

      console.log('Datos del formulario:', JSON.stringify(datosFormulario, null, 2));
      this.enviarCorreo(datosFormulario);
      await fetch(SharedService.getBaseURL()+"/form/fr", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(fromRec)
      }).then(response => response.json())
        .then(async (data) => {
          console.log('ID Formulario:', data.id);
          for (const pregunta of preguntas) {
            pregunta['idFormulario'] = data.id;
            console.log("Pregunta: ", JSON.stringify(pregunta));
            await fetch(SharedService.getBaseURL()+"/form/fp", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              body: JSON.stringify(pregunta)
            }).then(response => response.json())
              .then(d => {
                console.log(d);
              });
          }

        });
      alert('Formulario enviado.');
    } else {
      alert('Por favor, complete todos los campos correctamente antes de enviar el formulario.');
    }
  }
}
