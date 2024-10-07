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
        'otroCasilla': new FormControl(''),
        'motivo': new FormControl(''),
        'descripcion': new FormControl('')
    }, {
        validators: [this.alMenosUnaOpcionSeleccionada,this.alMenosUnaOpcionSeleccionada2]
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

}