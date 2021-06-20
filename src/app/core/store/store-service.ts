import { Subject } from "rxjs";
import { WeatherMapModel } from "../model/weather-map.model";

export class WeatherStoreData {
   lst:Array<WeatherMapModel> = [];
}

export class WeatherStoreService{
  
   public WeatherStoreData:Subject<WeatherStoreData> = new Subject<WeatherStoreData>();

    public setWeatherStore(newStoreData:WeatherStoreData){
      this.WeatherStoreData.next(newStoreData);
    }

    public getWeatherStoreData(){
        return this.WeatherStoreData;
    }

}

