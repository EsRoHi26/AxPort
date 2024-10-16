import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../servicios/sharedService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public SharedService: SharedService) {}

  login = new FormGroup({
    'usuario': new FormControl('', [Validators.required, this.validarCorreo]),
    'contraseña': new FormControl('', [Validators.required])
  });

  validarCorreo(control: AbstractControl): Validators | null {
    const correo = control.value;
    if (!/^[^\s@]+@itcr\.ac\.cr$/.test(correo)) { // Verifica si el formato es "(anychar)@itcr.ac.cr"
      return {
      invalidCorreo: true
      };
    }
    return null;
  }


  onSubmit() {
    SharedService.setLogged(true);
    if (SharedService.isLogged()) {
      console.log('Usuario logeado');
    }
  }

}
