import {Component, inject, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFabButton,
  IonFab,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol, IonImg
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {PhotosService} from "../services/photos.service";
import {NgFor} from "@angular/common";

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
    IonGrid,
    IonRow,
    IonCol,
    IonImg,

    NgFor,
    ExploreContainerComponent
  ]
})
export class Tab2Page implements OnInit {
  private photoService = inject(PhotosService);
  gallery = this.photoService.photos;

  constructor() {}

  ngOnInit() {
    this.photoService.loadSaved();
  }

  takePhoto() {
    this.photoService.newPhotoToGallery();
  }
}
