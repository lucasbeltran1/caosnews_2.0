import { Component, ElementRef, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.page.html',
  styleUrls: ['./animation.page.scss'],
})
export class AnimationPage implements AfterViewInit { 
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>; 
  // El decorador @ViewChildren permite seleccionar múltiples elementos de un mismo tipo (IonCard en este caso).
  // QueryList es una lista que contiene referencias a todos los elementos IonCard en el DOM.
  // Se usa ElementRef para obtener acceso directo a los elementos del DOM y modificarlos, en este caso, para aplicarles animaciones.

  private cardA: any; // Variable para almacenar la animación del primer card
  private cardB: any; // Variable para almacenar la animación del segundo card
  private cardC: any; // Variable para almacenar la animación del tercer card

  constructor(private animationCtrl: AnimationController) {}
  // El AnimationController se inyecta en el constructor para crear y controlar las animaciones.

  ngAfterViewInit() {
    // Se ejecuta una vez que la vista ha sido inicializada, permitiendo acceder a los elementos del DOM.
    const cardAElement = this.cardElements.get(0)?.nativeElement;
    const cardBElement = this.cardElements.get(1)?.nativeElement;
    const cardCElement = this.cardElements.get(2)?.nativeElement;

    // Aquí se obtienen los elementos IonCard directamente del DOM usando QueryList.
    // Se asegura de que cada elemento esté presente antes de aplicar la animación (usando el operador ?. para evitar errores si es null).

    if (cardAElement && cardBElement && cardCElement) {
      // Si los tres elementos están presentes, se crean las animaciones.
      this.cardA = this.animationCtrl
        .create()
        .addElement(cardAElement) // Se añade el primer elemento a la animación
        .fill('none') // No se mantiene el estado de la animación al finalizar
        .duration(1000) // Duración de la animación en milisegundos
        .keyframes([
          { offset: 0, transform: 'scale(1) rotate(0)' }, // Estado inicial
          { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' }, // A la mitad, el card crece y rota
          { offset: 1, transform: 'scale(1) rotate(0)' }, // Estado final, vuelve a su tamaño original
        ]);

      this.cardB = this.animationCtrl
        .create()
        .addElement(cardBElement)
        .fill('none')
        .duration(1000)
        .keyframes([
          { offset: 0, transform: 'scale(1)', opacity: '1' }, // Estado inicial con opacidad completa
          { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' }, // A la mitad, el card crece y se vuelve semitransparente
          { offset: 1, transform: 'scale(1)', opacity: '1' }, // Estado final, regresa a su tamaño y opacidad originales
        ]);

      this.cardC = this.animationCtrl
        .create()
        .addElement(cardCElement)
        .fill('none')
        .duration(1000)
        .keyframes([
          { offset: 0, transform: 'scale(1)', opacity: '0.5' }, // Estado inicial con opacidad baja
          { offset: 0.5, transform: 'scale(0.8)', opacity: '1' }, // A la mitad, el card se reduce y aumenta opacidad
          { offset: 1, transform: 'scale(1)', opacity: '0.5' }, // Estado final, vuelve al tamaño original y opacidad baja
        ]);
    }
  }

  async play() {
    // Función para iniciar las animaciones
    if (this.cardA && this.cardB && this.cardC) {
      // Si las animaciones están definidas, se inician de manera secuencial.
      await this.cardA.play();
      await this.cardB.play();
      await this.cardC.play();
    }
  }

  pause() {
    // Función para pausar las animaciones
    this.cardA?.pause();
    this.cardB?.pause();
    this.cardC?.pause();
  }

  stop() {
    // Función para detener las animaciones
    this.cardA?.stop();
    this.cardB?.stop();
    this.cardC?.stop();
  }
}
