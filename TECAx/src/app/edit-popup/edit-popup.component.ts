import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css'],
  imports: [CommonModule,FormsModule]
})
export class EditPopupComponent {
  @Input() visible: boolean = false;
  @Input() noticia: any = null;  // Recibe la noticia a editar

  @Output() updateEvent = new EventEmitter<any>();  // Emite los datos actualizados

  show() {
    this.visible = true;
    setTimeout(() => {
      const nombreInput = document.getElementById('titulo') as HTMLInputElement;
      if (nombreInput) {
        nombreInput.focus();
      }
    }, 0);
  }

  hide() {
    this.visible = false;
  }

  submit() {
    // Validar que los campos no estén vacíos
    if (!this.noticia.titulo || !this.noticia.fecha || !this.noticia.linkimagen || 
        !this.noticia.descripcionimagen || !this.noticia.linknoticia) {
      alert('Por favor, complete todos los campos requeridos: Título, Fecha, Link de Imagen, Descripción de Imagen y Link de Noticia.');
      return; // Detener la ejecución si hay campos vacíos
    }

    this.updateEvent.emit(this.noticia);  
    this.hide();
  }
}

