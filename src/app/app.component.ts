import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

//  const httpOptionss = {
//    headers: new HttpHeaders({
//      'Access-Control-Allow-Origin': '*'
//    })
//  };

const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-metric';
  appInfo: any;
  appHealthDetail: any;
  appMetricsDetail: any;
  appEnvDetail: any;
  
  //headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

  //appBaseUrl='http://10.118.169.49:8077/actuatorShowcase/';
  appBaseUrl = 'http://localhost:8077/actuatorShowcase/'

  //appInfoUrl = 'http://localhost:8077/actuatorShowcase/info';
  //appHealthUrl = 'http://localhost:8077/actuatorShowcase/health';
  //appMetricsUrl = 'http://localhost:8077/actuatorShowcase/metrics';
  //appEnvUrl = 'http://localhost:8077/actuatorShowcase/env';
  //appMetricsUrl = 'http://localhost:8787/metrics';

  constructor(private http: HttpClient) {}

  ngOnInit(){
    console.log("inside init()")
    this.getAppDetails();
    this.getAppHealthDetails();
    this.getAppMetricsDetails();
    this.getAppEnvDetails();
  }

  //app info related
  getAppDetails():void {
    this.restgetAppDetails()
    .subscribe(
      restItems => {
        this.appInfo = restItems;
        // console.log(this.appInfo);
      }
    )
  }
  // Rest Items Service: Read all REST Items
  restgetAppDetails() {
    return this.http
      .get<any[]>(this.appBaseUrl+'info')
      .pipe(map(data => data));
  }

// health related 
  getAppHealthDetails():void {
    this.restgetAppHealthDetails()
    .subscribe(
      restHealthDetails => {
        this.appHealthDetail = restHealthDetails;
        // console.log(this.appHealthDetail);
      }
    )
  }
  
  restgetAppHealthDetails() {
    return this.http
      .get<any[]>(this.appBaseUrl +'health')
      .pipe(map(data => data));
  }

//metrics related api 
getAppMetricsDetails():void {
  this.restgetAppMetricsDetails()
  .subscribe(
    restMetricsDetails => {
      this.appMetricsDetail = restMetricsDetails;
      console.log(this.appMetricsDetail);
    }
  )
}

restgetAppMetricsDetails() {
  return this.http
    .get<any[]>(this.appBaseUrl+'metrics')
    .pipe(map(data => data));
}

//env details
getAppEnvDetails():void {
  this.restgetAppEnvDetails()
  .subscribe(
    restEnvDetails => {
      this.appEnvDetail = restEnvDetails;  
      console.log(this.appEnvDetail);   
    }
  )
}

restgetAppEnvDetails() {
  return this.http
    .get<any[]>(this.appBaseUrl+'env')
    .pipe(map(data => data));
}

}
