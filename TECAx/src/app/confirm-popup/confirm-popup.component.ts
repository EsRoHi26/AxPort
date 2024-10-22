import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
  imports: [CommonModule]
})
export class ConfirmPopupComponent {
  visible: boolean = false;

  @Input() title: string = 'Confirmación';
  @Input() content: string = '¿Estás seguro de que deseas realizar esta acción?';

  @Output() confirmationResult = new EventEmitter<boolean>();

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  confirm() {
    this.confirmationResult.emit(true);  // Emitir true en caso de confirmación
    this.hide();
  }

  cancel() {
    this.confirmationResult.emit(false); // Emitir false en caso de cancelación
    this.hide();
  }
}
