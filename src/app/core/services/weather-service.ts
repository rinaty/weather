import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { WeatherStoreData, WeatherStoreService } from "../store/store-service";

export const cities = [
    {value:"0",viewValue:"Tel Aviv",lat:"32.0809",lon: "34.7806"},
    {value:"1",viewValue:"Ramat Gan",lat: "32.0806",lon: "34.8142"},
    {value:"2",viewValue:"Jerusalem",lat: "31.769",lon: "35.2163"},
    {value:"3",viewValue:"Lod",lat:"31.9514",lon: "34.8953"}
]
@Injectable()
export class WeatherService{
    constructor(public httpClient:HttpClient,public weatherStoreService:WeatherStoreService){

    }

    loadCities(){
        return of(cities);
    }

    loadWeatherByCityAndUnit(params:any):Observable<any>{
        var url = "https://openweathermap.org/data/2.5/onecall";
        return this.httpClient.get(url +"?lat="+params.lat+"&lon="+params.lon+"&units="+params.unit+"&appid="+params.appid);
    }

    setWeatherInStore(newStore:WeatherStoreData){
        this.weatherStoreService.setWeatherStore(newStore);
    }

    getWeatherStore(){
        return this.weatherStoreService.getWeatherStoreData();
    }

}

