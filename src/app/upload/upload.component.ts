import { Component } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage'; // Nueva API de Storage

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(private storage: Storage) {} // Cambia el tipo de `AngularFireStorage` a `Storage`

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `my-folder/${file.name}`;
    const storageRef = ref(this.storage, filePath); // Crea una referencia al archivo en el storage

    const uploadTask = uploadBytesResumable(storageRef, file); // Subir archivo usando la nueva API

    // Observa el progreso de la subida
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Progreso de subida: ${progress}%`);
      },
      (error) => {
        console.error('Error subiendo archivo:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Archivo disponible en:', downloadURL);
        });
      }
    );
  }
}
