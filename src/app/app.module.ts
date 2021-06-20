import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { WeatherMapComponent } from './weather-map/weather-map.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { WeatherService } from './core/services/weather-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherStoreService } from './core/store/store-service';

const ANGULAR_MATERIAL = [
  MatSelectModule,MatInputModule,MatIconModule
];
@NgModule({
  declarations: [
    AppComponent,WeatherMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ...ANGULAR_MATERIAL
  ],
  providers: [WeatherStoreService,WeatherService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
