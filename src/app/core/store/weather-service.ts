import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { WeatherStoreData, WeatherStoreService } from "../store/store-service";

@Injectable()
export class WeatherService{
    constructor(public httpClient:HttpClient,public weatherStoreService:WeatherStoreService){

    }

    loadCities(){
        return of([
            {value:"TelAviv",viewValue:"Tel Aviv"},
            {value:"RamatGan",viewValue:"Ramat Gan"},
        ])
    }

    loadWeatherByCityAndUnit(params:any){
        var url = "api.openweathermap.org/data/2.5/weather";
        return this.httpClient.get(url+"?q="+params.q+"&appid="+params.appid);
        // return of({
            
        // });
    }

    setWeatherInStore(newStore:WeatherStoreData){
        this.weatherStoreService.setWeatherStore(newStore);
    }

    getWeatherStore(){
        return this.weatherStoreService.getWeatherStoreData();
    }

}

