import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private collectionName = 'userData'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para crear un nuevo documento en la colección
  create(data: any): Promise<void> {
    const id = this.firestore.createId(); // Genera un ID único para el documento
    return this.firestore.collection(this.collectionName).doc(id).set(data);
  }

  // Método para obtener todos los documentos de la colección
  getAll(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' }) as unknown as Observable<any[]>;
  }

  // Método para obtener un solo documento por ID
  getById(id: string): Observable<any> {
    return this.firestore.collection(this.collectionName).doc(id).valueChanges() as unknown as Observable<any>;
  }

  // Método para actualizar un documento por ID
  update(id: string, data: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(data);
  }

  // Método para eliminar un documento por ID
  delete(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
