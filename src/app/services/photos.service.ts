import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {UserPhoto} from "../models/user-photo.model";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private readonly PHOTOS_GALLERY = 'gallery';

  photos: UserPhoto[] = [];

  constructor() { }

  async loadSaved() {
    const { value } = await Preferences.get({ key: this.PHOTOS_GALLERY });
    this.photos = value ? JSON.parse(value) : [];

    for (let p of this.photos) {
      const readFile = await Filesystem.readFile({
        path: p.filePath,
        directory: Directory.Data
      });

      p.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }

  async newPhotoToGallery() {
    const hasPermission = await Camera.checkPermissions();

    if (hasPermission.photos === 'granted') {
      const capturedPhoto = await this.takePhoto();
      const savedPhoto = await this.savePhoto(capturedPhoto);

      this.photos.unshift(savedPhoto);

      Preferences.set({
        key: this.PHOTOS_GALLERY,
        value: JSON.stringify(this.photos)
      });

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

  private async savePhoto(photo: Photo): Promise<UserPhoto> {
    const filename = `${Date.now()}.jpeg`;

    const savedFile = await Filesystem.writeFile({
      path: filename,
      data: await this.readAsBase64(photo),
      directory: Directory.Data
    });

    return {
      filePath: filename,
      webviewPath: photo.webPath
    }
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();


    return await this.convertBlobAsBase64(blob) as string;
  }

  private convertBlobAsBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    }

    reader.readAsDataURL(blob);
  })
}
