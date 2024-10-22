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
  }

  hide() {
    this.visible = false;
  }

  submit() {
    this.updateEvent.emit(this.noticia);  
    this.hide();
  }

  
}

