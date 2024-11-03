import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor() { }

  async newPhotoToGallery() {
    const hasPermission = await Camera.checkPermissions();

    if (hasPermission.photos === 'granted') {
      const capturedPhoto = await this.takePhoto();

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
