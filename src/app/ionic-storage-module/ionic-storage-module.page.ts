import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController, AlertController } from '@ionic/angular'; // Agregamos AlertController para confirmaciones

@Component({
  selector: 'app-ionic-storage-module',
  templateUrl: './ionic-storage-module.page.html',
  styleUrls: ['./ionic-storage-module.page.scss'],
})
export class IonicStorageModulePage {
  dataForm: FormGroup;
  storedData: any[] = [];
  uploadProgress: number | null = null;
  isEditMode: boolean = false;
  editDocId: string | null = null;
  selectedUser: any | null = null; // Variable para el usuario seleccionado

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private toastController: ToastController,
    private alertController: AlertController // Inyectamos el AlertController
  ) {
    // Inicialización del formulario
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      rut: ['', [Validators.required]],
      age: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }

  // Método para seleccionar un usuario con checkbox
  onSelectUser(data: any) {
    // Deseleccionar otros usuarios
    this.storedData.forEach(user => {
      if (user.id !== data.id) {
        user.isSelected = false;
        user.isEditing = false; // Salir del modo de edición si otro usuario está seleccionado
      }
    });
    this.selectedUser = data.isSelected ? data : null; // Guardar el usuario seleccionado
  }

  // Método para activar el modo de edición en la fila seleccionada
  editRow() {
    if (!this.selectedUser) {
      this.showErrorMessage('Debes seleccionar un usuario para modificar.');
      return;
    }
    // Solo activar el modo edición para el usuario seleccionado
    this.selectedUser.isEditing = true;
  }

  // Método para guardar los cambios en la fila modificada
  async saveRowData() {
    if (!this.selectedUser) {
      this.showErrorMessage('Debes seleccionar un usuario para guardar los cambios.');
      return;
    }

    try {
      // Actualizar el documento de Firestore con los nuevos datos
      await this.firestore.collection('userData').doc(this.selectedUser.id).update({
        name: this.selectedUser.name,
        age: this.selectedUser.age,
        sexo: this.selectedUser.sexo,
        phone: this.selectedUser.phone
      });
      this.selectedUser.isEditing = false; // Salir del modo de edición
      this.showSuccessMessage('Datos actualizados correctamente.');
    } catch (error) {
      this.handleError(error, 'Error al actualizar los datos.');
    }
  }

  // Método para guardar o modificar datos en Firestore desde el formulario
  async saveData() {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;

      try {
        if (this.isEditMode && this.editDocId) {
          await this.firestore.collection('userData').doc(this.editDocId).update(formData);
          this.showSuccessMessage('Datos actualizados correctamente.');
        } else {
          const rutExists = await this.firestore.collection('userData', ref => ref.where('rut', '==', formData.rut)).get().toPromise();
          if (!rutExists?.empty) {
            this.showErrorMessage('El RUT ya existe. No se pueden duplicar RUTs.');
            return;
          }
          const docRef = await this.firestore.collection('userData').add(formData);
          this.editDocId = docRef.id; // Guarda el docId para la imagen
          this.showSuccessMessage('Datos guardados correctamente.');
        }

        this.dataForm.reset();
        this.isEditMode = false;
        this.editDocId = null;
        this.showStoredData();
      } catch (error) {
        this.handleError(error, 'Error al guardar los datos.');
      }
    }
  }

  // Método para mostrar los datos almacenados
  async showStoredData() {
    try {
      const snapshot = await this.firestore.collection('userData').get().toPromise();
      this.storedData = snapshot?.docs.map(doc => {
        const data = doc.data() as { [key: string]: any }; // Asegura que data es un objeto
        return { id: doc.id, ...data, isSelected: false, isEditing: false }; // Añade isSelected e isEditing para cada fila
      }) || [];
    } catch (error) {
      this.handleError(error, 'Error al recuperar los datos.');
    }
  }

  // Método para subir imagen a Firebase Storage y guardar URL en Firestore
  async uploadImage(event: any, docId: string) {
    const file = event.target.files[0];
    if (!file) {
      this.showErrorMessage('No se seleccionó ningún archivo.');
      return;
    }

    const filePath = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);

    try {
      const task = this.storage.upload(filePath, file);

      task.percentageChanges().subscribe((progress) => {
        this.uploadProgress = progress || 0;
        console.log(`Progreso de subida: ${this.uploadProgress}%`);
      });

      await task.snapshotChanges().toPromise();

      const imageUrl = await fileRef.getDownloadURL().toPromise();

      // Actualiza el documento en Firestore con la URL de la imagen
      await this.firestore.collection('userData').doc(docId).update({ imageUrl });

      this.showSuccessMessage('Imagen subida correctamente.');
    } catch (error) {
      this.handleError(error, 'Error al subir la imagen.');
    }
  }

  // Método para descargar archivo del usuario
  async downloadFile(fileUrl: string) {
    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'file'; // Nombre del archivo descargado
      link.click();
    } catch (error) {
      this.handleError(error, 'Error al descargar el archivo.');
    }
  }

  // Confirmar eliminación de registro
  async confirmDelete(rut: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro que deseas eliminar este registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteByRut(rut); // Llamada a la función de eliminar
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para eliminar datos por RUT
async deleteByRut(rut: string) {
  try {
    const snapshot = await this.firestore.collection('userData', ref => ref.where('rut', '==', rut)).get().toPromise();
    if (snapshot && !snapshot.empty) {
      snapshot.forEach(async (doc) => {
        await this.firestore.collection('userData').doc(doc.id).delete();
      });
      this.showSuccessMessage(`Registro con RUT ${rut} eliminado correctamente.`);
      this.showStoredData();
    } else {
      this.showErrorMessage(`No se encontró el registro con RUT ${rut}.`);
    }
  } catch (error) {
    this.handleError(error, 'Error al eliminar el registro.');
  }
}

  // Método para manejar errores
  private handleError(error: any, defaultMessage: string) {
    let errorMessage = defaultMessage;
    if (error instanceof Error) {
      errorMessage = `${defaultMessage} ${error.message}`;
    }
    this.showErrorMessage(errorMessage);
  }

  // Métodos para mostrar mensajes
  async showSuccessMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }

  async showErrorMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
  }
}
