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
    selector: 'app-formulario-solicitud',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './formulario-solicitud.component.html',
    styleUrls: ['./formulario-solicitud.component.css']
})
export class FormularioSolicitudComponent {

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
        if (!/^\d+$/.test(cedula)) { // Verifica si solo contiene números
            return {
                invalidCedula: true
            };
        }
        return null;
    }


}