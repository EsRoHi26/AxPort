import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-popup',
  standalone: true,
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css'],
  imports: [CommonModule,FormsModule]  // Incluye CommonModule para usar ngIf, ngModel, etc.
})
export class AddPopupComponent {
  @Input() visible: boolean = false;  // Controla la visibilidad del pop-up
  @Input() noticia: any = {            // Recibe la noticia a editar
    fecha: '',
    titulo: '',
    linkimagen: '',
    descripcionimagen: '',
    linknoticia: ''
  };

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
  // Función para ocultar el pop-up
  hide() {
    this.visible = false;
  }

  // Función para guardar y emitir la noticia
  submit() {
    console.log(this.noticia)
    if (this.noticia.fecha && this.noticia.titulo && this.noticia.linkimagen && 
        this.noticia.descripcionimagen && this.noticia.linknoticia) {
      this.updateEvent.emit(this.noticia);  // Emitir el objeto noticia
      this.hide();  // Ocultar el pop-up
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
}
