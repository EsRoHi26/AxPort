import { Component, EventEmitter, Input, Output, ViewChild, ElementRef,AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-recurso',
  standalone: true,
  templateUrl: './add-recurso.component.html',
  styleUrl: './add-recurso.component.css',
  imports: [CommonModule,FormsModule]
})

export class AddRecursoComponent  implements AfterViewInit {
  @Input() visible: boolean = false;  // Controla la visibilidad del pop-up
  @Input() recurso: any = {            // Cambié 'noticia' a 'recurso'
    id: null,                          // Añadí el campo id
    nombre: '',
    descripcion: '',
    url: '',
    imagen: '',
    descripcionimagen: '',
    tipo: ''
  };
  ngAfterViewInit() {
    if (this.visible) {
      this.setFocus();
    }
  }
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  setFocus() {
    if (this.nombreInput) {
      this.nombreInput.nativeElement.focus();
    }
  }
  @Output() updateEvent = new EventEmitter<any>();  // Emite los datos actualizados

  // Función para mostrar el pop-up
  show() {
    this.visible = true;
    setTimeout(() => {
      const nombreInput = document.getElementById('nombre') as HTMLInputElement;
      if (nombreInput) {
        nombreInput.focus();
      }
    }, 0);
  }

  // Función para ocultar el pop-up
  hide() {
    this.visible = false;
  }

  // Función para guardar y emitir el recurso
  submit() {
    console.log(this.recurso);
    if (this.recurso.nombre && this.recurso.descripcion && this.recurso.url && 
        this.recurso.imagen && this.recurso.descripcionimagen && this.recurso.tipo) {
      console.log('efectivamente'+this.recurso)
      this.updateEvent.emit(this.recurso);  // Emitir el objeto recurso
      this.hide();  // Ocultar el pop-up
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
}
