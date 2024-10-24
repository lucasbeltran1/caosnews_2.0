import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service'; // Importa el servicio del clima
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx'; // Importa el plugin de geolocalización
import { Platform } from '@ionic/angular'; // Para asegurar que la plataforma esté lista antes de acceder a plugins

interface CarouselItem {
  title: string;
  description: string;
  image: string;
}

interface Card {
  image: string;
  title: string;
  subtitle: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Variables para el clima y predicciones
  weatherData: any = null;
  forecastData: any = null; // Para almacenar las predicciones del clima filtradas
  city: string = '';
  lat: number = 0;
  lon: number = 0;
  useCurrentLocation: boolean = true; // Variable para determinar si se usa geolocalización

  // Opciones de configuración del slide
  slideOpts: { initialSlide: number; speed: number; autoplay: { delay: number } } = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    },
  };

  // Datos para los items del carrusel
  items: CarouselItem[] = [
    { title: 'Item 1', description: 'Descripción del item 1', image: 'assets/img/carrusel1.jpg' },
    { title: 'Item 2', description: 'Descripción del item 2', image: 'assets/img/carrusel2.jpg' },
    { title: 'Item 3', description: 'Descripción del item 3', image: 'assets/img/carrusel3.jpg' },
  ];

  // Datos para las tarjetas
  cards: Card[] = [
    {
      image: 'assets/img/carrusel1.jpg',
      title: 'Card Title 1',
      subtitle: 'Card Subtitle 1',
      content: "Here's a small text description for the card content.",
    },
    {
      image: 'assets/img/carrusel2.jpg',
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      content: "Here's a small text description for the card content.",
    },
    {
      image: 'assets/img/carrusel3.jpg',
      title: 'Card Title 3',
      subtitle: 'Card Subtitle 3',
      content: "Here's a small text description for the card content.",
    },
    {
      image: 'assets/img/foto1.jpg',
      title: 'Card Title 4',
      subtitle: 'Card Subtitle 4',
      content: "Here's a small text description for the card content.",
    },
  ];

  constructor(
    private weatherService: WeatherService,
    private geolocation: Geolocation,
    private platform: Platform
  ) {}

  ngOnInit() {
    // Este método se ejecutará cuando el componente se inicialice.
    console.log('HomePage inicializado');
    this.getCurrentLocationWeather(); // Obtener el clima de la ubicación actual al iniciar la app
  }

  // Método para obtener la ubicación actual y el clima
  getCurrentLocationWeather() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        this.getWeatherByLocation(); // Obtener el clima usando la latitud y longitud
      }).catch((error) => {
        console.error('Error al obtener la geolocalización', error);
      });
    });
  }

  // Método para obtener el clima usando la ubicación actual
  getWeatherByLocation() {
    this.weatherService.getWeatherByCoordinates(this.lat, this.lon).subscribe(
      (data) => {
        this.weatherData = data; // Almacena los datos del clima
        console.log('Datos del clima desde geolocalización:', data);
      },
      (error) => {
        console.error('Error al obtener los datos del clima por geolocalización:', error);
      }
    );

    // Obtener las predicciones del clima para la ubicación actual
    this.weatherService.getForecastByCoordinates(this.lat, this.lon).subscribe(
      (forecast) => {
        this.forecastData = this.calculateDailyForecast(forecast.list);
        console.log('Predicciones del clima desde geolocalización:', this.forecastData);
      },
      (error) => {
        console.error('Error al obtener las predicciones del clima por geolocalización:', error);
      }
    );
  }

  // **Método agregado para consultar el clima manualmente por nombre de ciudad**
  getWeather() {
    if (this.city) {
      this.weatherService.getWeatherByCity(this.city).subscribe(
        (data) => {
          this.weatherData = data;
          console.log('Datos del clima por ciudad:', data);
        },
        (error) => {
          console.error('Error al obtener los datos del clima por ciudad:', error);
        }
      );

      this.weatherService.getForecastByCity(this.city).subscribe(
        (forecast) => {
          this.forecastData = this.calculateDailyForecast(forecast.list);
          console.log('Predicciones del clima por ciudad:', this.forecastData);
        },
        (error) => {
          console.error('Error al obtener las predicciones del clima por ciudad:', error);
        }
      );
    }
  }

  // Método para calcular las mínimas y máximas diarias
  calculateDailyForecast(forecastList: any[]): any[] {
    const dailyForecast: any[] = [];
    const dayMap: { [key: string]: any[] } = {};

    forecastList.forEach((forecast: any) => {
      const date = new Date(forecast.dt_txt).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      if (!dayMap[date]) {
        dayMap[date] = [];
      }

      dayMap[date].push(forecast);
    });

    for (const date in dayMap) {
      const dayForecasts = dayMap[date];
      const minTemp = Math.min(...dayForecasts.map((f: any) => f.main.temp_min));
      const maxTemp = Math.max(...dayForecasts.map((f: any) => f.main.temp_max));

      dailyForecast.push({
        date,
        temp_min: minTemp,
        temp_max: maxTemp,
        description: dayForecasts[0].weather[0].description,
        icon: dayForecasts[0].weather[0].icon,
      });
    }

    return dailyForecast.slice(0, 5); // Limitar a 5 días
  }
}
