import { Component, ElementRef, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home4',
  templateUrl: './home4.page.html',
  styleUrls: ['./home4.page.scss'],
})
export class Home4Page implements AfterViewInit {
  images = [
    { title: 'Imagen 1', image: 'assets/img/carrusel1.jpg' },
    { title: 'Imagen 2', image: 'assets/img/carrusel2.jpg' },
    { title: 'Imagen 3', image: 'assets/img/carrusel3.jpg' },
  ];

  currentIndex = 0;
  animationState = '';

  @ViewChildren(IonCard, { read: ElementRef }) cardElements?: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation: any;

  constructor(
    private animationCtrl: AnimationController,
    private platform: Platform,
    private location: Location
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }

  ngAfterViewInit() {
    if (!this.cardElements) {
      return;
    }

    const cardAElement = this.cardElements.get(0)?.nativeElement;
    const cardBElement = this.cardElements.get(1)?.nativeElement;
    const cardCElement = this.cardElements.get(2)?.nativeElement;

    if (cardAElement && cardBElement && cardCElement) {
      const cardA = this.animationCtrl
        .create()
        .addElement(cardAElement)
        .keyframes([
          { offset: 0, transform: 'scale(1) rotate(0)' },
          { offset: 0.5, transform: 'scale(1.5) rotate(45deg)' },
          { offset: 1, transform: 'scale(1) rotate(0)' },
        ]);

      const cardB = this.animationCtrl
        .create()
        .addElement(cardBElement)
        .keyframes([
          { offset: 0, transform: 'scale(1)', opacity: '1' },
          { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
          { offset: 1, transform: 'scale(1)', opacity: '1' },
        ]);

      const cardC = this.animationCtrl
        .create()
        .addElement(cardCElement)
        .duration(5000)
        .keyframes([
          { offset: 0, transform: 'scale(1)', opacity: '0.5' },
          { offset: 0.5, transform: 'scale(0.5)', opacity: '1' },
          { offset: 1, transform: 'scale(1)', opacity: '0.5' },
        ]);

      this.animation = this.animationCtrl
        .create()
        .duration(2000)
        .iterations(Infinity)
        .addAnimation([cardA, cardB, cardC]);
    }
  }

  // Método para reproducir la animación
  play() {
    if (this.animation) {
      this.animation.play();
    }
  }

  stop() {
    if (this.animation) {
      this.animation.stop();
    }
  }

  pause() {
    if (this.animation) {
      this.animation.pause();
    }
  }
}
