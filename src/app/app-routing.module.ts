import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherMapComponent } from './weather-map/weather-map.component';

const routes: Routes = [
  { path: "weather" , component:WeatherMapComponent},
  {  path:"**",redirectTo:"weather" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
