import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {UserPhoto} from "../models/user-photo.model";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  photos: UserPhoto[] = [];

  constructor() { }

  async newPhotoToGallery() {
    const hasPermission = await Camera.checkPermissions();

    if (hasPermission.photos === 'granted') {
      const capturedPhoto = await this.takePhoto();

      this.photos.unshift({
        filePath: 'processing...',
        webviewPath: capturedPhoto.webPath!
      })
    } else {
      await Camera.requestPermissions();
    }
  }

  private takePhoto(): Promise<Photo> {
    return Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }
}
