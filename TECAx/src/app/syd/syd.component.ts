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
    { img: '../assets/Denduncia_estudiante.png', alt: '' },
    { img: '../assets/Diagrama_funiconario.png', alt: '' },
    { img: '../assets/Diagrama_visitante.png', alt: '' },
    { img: '../assets/Diagrama_acompannamiento.png', alt: '' }
    
    

  ];
  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
  }
}
