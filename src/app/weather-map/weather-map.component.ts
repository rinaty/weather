import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { WeatherMapModel } from "../core/model/weather-map.model";
import { WeatherService } from "../core/services/weather-service";
import { WeatherStoreData } from "../core/store/store-service";

@Component({
    selector:'weather-map',
    templateUrl:'./weather-map.component.html',
    styleUrls:['./weather-map.component.css']
})

export class WeatherMapComponent implements OnInit,OnDestroy{

    form:FormGroup = new FormGroup({});
    weatherList:Array<WeatherMapModel> = [];
    weatherStore:WeatherStoreData = new WeatherStoreData();
    cities:Array<any> = [];
    getWeatherStoreSubscription:Subscription = new Subscription();
    appid:string = "439d4b804bc8187953eb36d2a8c26a02";

    constructor(public fb:FormBuilder,
        public weatherService:WeatherService){

    }
    ngOnInit(){
        this.initForm();
        this.loadCities();
        this.getWeatherStore();
    }

    initForm(){
        this.form = this.fb.group({
            weatherMaps:this.fb.array([
                this.initItem()
             ])
        })
    }

    initItem(){
       return this.fb.group({
            city:['',[Validators.required]],
            unit:['',[Validators.required]],
            temp:['']
         });
    }

    getWeatherStore(){
        this.getWeatherStoreSubscription = this.weatherService.getWeatherStore().subscribe(res => {
            this.weatherStore = res;
        });
    }

    getWeatherTemps(){
        return (<FormGroup>this.form.get('weatherMaps')).controls;
    }

    getWeatherTempsArray(){
        return (<FormArray>this.form.get('weatherMaps'));
    }

    addItem(i:number){
        this.getWeatherTempsArray().controls[i].markAsTouched();
        var item = this.getWeatherTempsArray().controls[i];
        if(item.valid){
            var weatherItem = item.value;
            var lat = this.cities[weatherItem.city].lat;
            var lon = this.cities[weatherItem.city].lon;
            var params = {appid:this.appid,unit:weatherItem.unit,lat:lat,lon:lon};
            this.weatherService.loadWeatherByCityAndUnit(params).subscribe((res) => {
                if(res && res.current){
                    item.get('temp')?.setValue(res.current.temp);
                    this.weatherStore.lst.push(item.value);
                    this.getWeatherTempsArray().push(this.initItem());
                    this.weatherService.setWeatherInStore(this.weatherStore)
                }              
            });
        }
    }

    loadCities(){
        this.weatherService.loadCities().subscribe(res => {
            this.cities = res;
        });
    }

    ngOnDestroy(){
        if(this.getWeatherStoreSubscription){
            this.getWeatherStoreSubscription.unsubscribe();
        }
    }
}
