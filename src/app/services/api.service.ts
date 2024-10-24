import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.ejemplo.com'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método GET para obtener datos
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ruta`);
  }

  // Método POST para enviar datos
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ruta`, data);
  }

  // Puedes añadir más métodos según tus necesidades (PUT, DELETE, etc.)
}
