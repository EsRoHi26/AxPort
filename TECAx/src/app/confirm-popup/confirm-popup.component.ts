import { Component, EventEmitter, Input, Output, ViewChild, ElementRef,AfterViewInit  } from '@angular/core';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
  imports: [CommonModule]
})
export class ConfirmPopupComponent implements AfterViewInit {
  visible: boolean = false;

  @Input() title: string = 'Confirmación';
  @Input() content: string = '¿Estás seguro de que deseas realizar esta acción?';

  @Output() confirmationResult = new EventEmitter<boolean>();
  @ViewChild('popupContent') popupContent!: ElementRef; // Usando el operador de aserción de no nulidad

  show() {
    this.visible = true;
   
  }
  ngAfterViewInit() {
    if (this.visible) {
      this.setFocus();
    }
  }
  setFocus() {
    const cancelButton = this.popupContent.nativeElement.querySelector('#no'); // Obtiene el botón Cancelar
    if (cancelButton) {
      cancelButton.focus(); // Enfoca el botón Cancelar
    }
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
