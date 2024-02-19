import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weatherapp';
  cityName: string = "";
  weatherData: any=[]; 
  currentDate: string=""
  currentTime: string=""

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const currentDate = this.datePipe.transform(new Date(), 'MMM d yyy');
    this.currentDate = currentDate || '';
  
    const currentTime = this.datePipe.transform(new Date(), 'hh:mm a');
    this.currentTime = currentTime || '';
  
    // Initialize weatherData with the necessary properties
    this.weatherData = {
      main: {
        temp: null,
        temp_min: null,
        temp_max: null
      }
    };
  }
  

  getWeatherDetails() {
    if (this.cityName.trim() !== '') {
      console.log(this.cityName);
  
      // Make HTTP GET request to OpenWeatherMap API
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=5b4bee0ba241d092159faf007e166080`)
        .subscribe((data: any) => {
          // Assign received weather data to the weatherData object
          this.weatherData = data;
          console.log(this.weatherData);
        }, error => {
          console.error('Error fetching weather data:', error); 
  
          if (error.status === 404)  {
            alert('City Not Found. Please Enter a Valid City');
          } else {
            alert('An unexpected error occurred. Please try again after.');
          }
          
          // Reset weatherData to null
          this.weatherData = null;
        });
    } else {
      // Reset weatherData to null if cityName is empty
      this.weatherData = null;
    }
  }
  
  
  
 // Method to convert temperature from Kelvin to Celsius
 kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}
}  