import {
    Component
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';
import {
    CommonModule
} from '@angular/common';
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

    formularioDenuncia = new FormGroup({
        'rol': new FormControl('', [Validators.required]),
        'nombre': new FormControl('', [Validators.required]),
        'dependencia': new FormControl(''),
        'carrera': new FormControl(''),
        'correo': new FormControl('', [Validators.required, Validators.email]),
        'cedula': new FormControl(''),
        'carne': new FormControl(''),
        'fecha': new FormControl('', [Validators.required, this.validarFecha]),
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
        'otroCasilla': new FormControl('', [this.validarOtro]),
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
            return CAIS || CISO || caja || seguros || otroCheckbox ? null : {
                ningunaSeleccionada: true
            };
        } else return null;

        /*
        if (otroCheckbox && otroTexto === ''){
            return { textoRequerido: true };
        }else{return CAIS || CISO ||caja ||seguros ||otroCheckbox ? null : {
            ningunaSeleccionada: true
        };}*/


    }
    validarOtro(control: AbstractControl): ValidationErrors | null {
        const formGroup = control as FormGroup;
        const otroCheckbox = formGroup.get('otroCheckbox')?.value;
        const otroTexto = formGroup.get('otroCasilla')?.value;
        if (otroCheckbox && otroTexto === '') {
            return {
                textoRequerido: true
            };
        } else {
            return null
        }


    }
    validarCedula(control: AbstractControl): ValidationErrors | null {
        const cedula = control.value;
        if (!/^\d+$/.test(cedula)) { // Verifica si solo contiene números
            return {
                invalidCedula: true
            };
        }
        return null;
    }
    validarFecha(control: AbstractControl): ValidationErrors | null {
        const fecha = control.value;

        // Expresión regular para verificar el formato d/m/yyyy
        const fechaRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;

        if (!fechaRegex.test(fecha)) {
            return {
                invalidFecha: true
            };
        }


        const [dia, mes, año] = fecha.split('/').map(Number);

        // Verificar si la fecha es válida
        const fechaObj = new Date(año, mes - 1, dia);
        if (fechaObj.getFullYear() !== año || fechaObj.getMonth() !== (mes - 1) || fechaObj.getDate() !== dia) {
            return {
                invalidFecha: true
            };
        }

        return null;

    }

    constructor() {
        this.formularioDenuncia.get('rol')?.setValue('');
        this.formularioDenuncia.get('sede')?.setValue('');
        this.formularioDenuncia.get('rol')?.valueChanges.subscribe(value => {
            if (value === 'Estudiante') {
                this.formularioDenuncia.get('carrera')?.setValidators([Validators.required]);
                this.formularioDenuncia.get('carne')?.setValidators([Validators.required, this.validarCedula]);

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

    onCheckboxChange(selected: string) {
        if (selected === 'si') {
            this.formularioDenuncia.get('no')?.setValue(false); // Desmarcar 'no'
        } else if (selected === 'no') {
            this.formularioDenuncia.get('si')?.setValue(false); // Desmarcar 'si'
        }
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
    onSubmit() {
        if (this.formularioDenuncia.valid) {
            const datosFormulario : Record<string, any> = {
                rol: this.formularioDenuncia.get('rol')?.value, //¿Usted es?
                correo: this.formularioDenuncia.get('correo')?.value,
                nombre: this.formularioDenuncia.get('nombre')?.value,
                dependencia: this.formularioDenuncia.get('dependencia')?.value,
                fecha: this.formularioDenuncia.get('fecha')?.value,
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
                datosFormulario["ambiente"] = "Ambiente (infraestructura)";
            }

            if (informacion) {
                datosFormulario["informacion"] ="Información y Comunicación";
            }

            if (tecnologias) {
                datosFormulario["tecnologias"] ="Tecnologías de apoyo a la discapacidad";
            }

            if (servicios) {
                datosFormulario["servicios"] ="Servicios";
            }

            if (actitudinal) {
                datosFormulario["actitudinal"] ="Actitudinal (actitudes y acciones de personas)";
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
                if (si){
                    datosFormulario["apoyo"] = "Sí";
                } else{
                    datosFormulario["apoyo"] = "No";
                }
                /*Responde a Forma parte del Programa de Servicios
                 para estudiantes con Discapacidad y Necesidades Educativas (PSED):
                */
                const si2 = this.formularioDenuncia.get('si2')?.value;
                if (si2){
                    datosFormulario["formaParte"] = "Sí";
                } else{
                    datosFormulario["formaParte"] = "No";
                }
            }
            if (rol === 'Funcionario'){
                /*Responde a Forma parte del Programa de Servicios
                 para estudiantes con Discapacidad y Necesidades Educativas (PSED):
                */  
                const si3 = this.formularioDenuncia.get('si3')?.value;
                 if (si3){
                    datosFormulario["apoyo"] = "Sí";
                } else{
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
                    datosFormulario["CAIS"] = "Clínica de Atención Integral en Salud (CAIS)";
                }
    
                if (CISO) {
                    datosFormulario["CISO"] ="Comisión Institucional de Salud Ocupacional (CISO)";
                }
    
                if (caja) {
                    datosFormulario["caja"] ="Caja Costarricense de Seguro Social";
                }
    
                if (seguros) {
                    datosFormulario["seguros"] ="Instituto Nacional de Seguros";
                }
    
                if (otroCheckbox) {
                    datosFormulario["otro"] =otroCasilla;
                }

            }

            console.log('Datos del formulario:', JSON.stringify(datosFormulario, null, 2));
           
           
            

        }
    }
}