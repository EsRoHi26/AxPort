import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-syd',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './syd.component.html',
  styleUrl: './syd.component.css'
})
export class SydComponent {
  activeSlide = 0;
  slides = [
    { img: '../assets/Denduncia_estudiante.png', alt: 'Diagrama que describe los pasos que debe seguir un estudiante para realizar una denuncia' },
    { img: '../assets/Diagrama_funiconario.png', alt: 'Diagrama que describe los pasos que debe seguir un funcionario para realizar una denuncia' },
    { img: '../assets/Diagrama_visitante.png', alt: 'Diagrama que describe los pasos que debe seguir un visitante para realizar una denuncia' },
    { img: '../assets/Diagrama_acompannamiento.png', alt: 'Diagrama que describe los pasos que debe seguir para solicitar acompañamiento' }
  ];
  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
  }
}