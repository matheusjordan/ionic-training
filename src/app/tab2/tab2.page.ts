import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton, IonFab, IonIcon} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    ExploreContainerComponent
  ]
})
export class Tab2Page {

  constructor() {}

}
