import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // API Key de OpenWeather
  private apiKey = '5a0dc8384e8521e4550f387867235027';

  // URLs base para el clima actual y pronóstico
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  /**
   * Método para obtener el clima actual de una ciudad.
   * @param city - Nombre de la ciudad.
   * @returns Un Observable con la respuesta del API de OpenWeather.
   */
  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<any>(url);
  }

  /**
   * Método para obtener el pronóstico de 5 días de una ciudad.
   * @param city - Nombre de la ciudad.
   * @returns Un Observable con la respuesta del API de OpenWeather.
   */
  getForecastByCity(city: string): Observable<any> {
    const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<any>(url);
  }

  /**
   * Método para obtener el clima actual basado en coordenadas (geolocalización).
   * @param lat - Latitud.
   * @param lon - Longitud.
   * @returns Un Observable con la respuesta del API de OpenWeather.
   */
  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<any>(url);
  }

  /**
   * Método para obtener el pronóstico de 5 días basado en coordenadas (geolocalización).
   * @param lat - Latitud.
   * @param lon - Longitud.
   * @returns Un Observable con la respuesta del API de OpenWeather.
   */
  getForecastByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<any>(url);
  }
}
