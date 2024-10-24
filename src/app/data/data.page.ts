import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { WeatherService } from '../services/weather.service'; // Importa el servicio del clima
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  dataForm: FormGroup;
  dataList: any[] = [];
  weatherData: any = null; // Variable para almacenar los datos del clima
  city: string = ''; // Ciudad ingresada por el usuario

  constructor(
    private dataService: DataService,
    private weatherService: WeatherService, // Inyecta el servicio del clima
    private formBuilder: FormBuilder
  ) {
    // Inicialización del formulario
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getData();
  }

  // Método para crear un nuevo documento
  createData() {
    if (this.dataForm.valid) {
      this.dataService.create(this.dataForm.value).then(() => {
        console.log('Datos creados correctamente');
        this.dataForm.reset();
        this.getData(); // Refresca la lista de datos
      });
    }
  }

  // Método para obtener todos los datos
  getData() {
    this.dataService.getAll().subscribe((data) => {
      this.dataList = data;
    });
  }

  // Método para eliminar un documento
  deleteData(id: string) {
    this.dataService.delete(id).then(() => {
      console.log('Datos eliminados correctamente');
      this.getData(); // Refresca la lista de datos
    });
  }

  // Método para obtener los datos del clima de la ciudad
  getWeather() {
    if (this.city) {
      this.weatherService.getWeatherByCity(this.city).subscribe(
        (data) => {
          this.weatherData = data; // Almacena los datos del clima
          console.log('Datos del clima:', data);
        },
        (error) => {
          console.error('Error al obtener los datos del clima:', error);
        }
      );
    }
  }
}
