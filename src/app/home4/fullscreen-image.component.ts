import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fullscreen-image',
  template: `
    <ion-content (click)="dismiss()">
      <ion-img [src]="photo"></ion-img>
    </ion-content>
  `,
  styleUrls: ['./fullscreen-image.component.scss'],
})
export class FullscreenImageComponent {
    @Input() photo: string = '';


  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
