import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-recurso',
  standalone: true,
  templateUrl: './edit-recurso.component.html',
  styleUrls: ['./edit-recurso.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EditRecursoComponent {
  @Input() visible: boolean = false;          // Controla la visibilidad del pop-up
  @Input() recurso: any = null;                // Recibe el recurso a editar

  @Output() updateEvent = new EventEmitter<any>(); // Emite los datos actualizados

  show() {
    this.visible = true;  // Muestra el pop-up
    setTimeout(() => {
      const nombreInput = document.getElementById('nombre') as HTMLInputElement;
      if (nombreInput) {
        nombreInput.focus();
      }
    }, 0);
  }

  hide() {
    this.visible = false; // Oculta el pop-up
  }

  submit() {
    // Validar que los campos no estén vacíos
    if (!this.recurso.nombre || !this.recurso.descripcion || !this.recurso.url || 
        !this.recurso.imagen || !this.recurso.descripcionimagen || !this.recurso.tipo) {
      alert('Por favor, complete todos los campos requeridos: Nombre, Descripción, URL, URL de Imagen, Descripción de Imagen y Tipo.');
      return; // Detener la ejecución si hay campos vacíos
    }

    this.updateEvent.emit(this.recurso);  // Emitir el objeto recurso actualizado
    this.hide(); // Ocultar el pop-up
  }
}
