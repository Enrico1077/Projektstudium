import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GlobalService } from '../global.service';
import { CookieService } from 'ngx-cookie-service';
import { ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-anlageneffektivitaet',
  templateUrl: './anlageneffektivitaet.component.html',
  styleUrls: ['./anlageneffektivitaet.component.scss']
})



export class AnlageneffektivitaetComponent implements OnInit {

  // Variablen
  data: any;
  machineTimeString: string = "450";
  spindleTimeString: string = "153";
  spindleTimeNumber: number = 0;
  machineTimeNumber: number = 0;
  spindleTimeRelative: number = 0;
  public meinWert: number = 80; //Test-Variable (Prozent vom Kreisdiagramm)




  constructor(
    private apiService: ApiService,
    private globalService: GlobalService,
    private cookieService: CookieService
  ){
    this.loadData();
  }

  ngOnInit(): void{
    //this.loadData();
    //this.calculateRelativeSpindleTime();
  }

  //Daten importieren aus json-Datei
  loadData(){
    this.apiService.getJsonData().subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);
        this.calculations();

      },
      error: (error) => {
        console.error("Ein Fehler ist aufgetreten!", error);
      }
    });
  }

  calculations(){
    this.calculateRelativeSpindleTime();
    this.doughnutChartData={
      datasets: [{
        data: [this.spindleTimeRelative, 100-this.spindleTimeRelative],
        backgroundColor: ['#ed1c24', 'lightgray'],
        hoverBackgroundColor: ['#DF0101', 'gray']
      }]
    };
  }

  calculateRelativeSpindleTime(){
    this.spindleTimeNumber = +this.data.App_Daten.Maschinenzeit_Spindel;
    this.machineTimeNumber = +this.data.App_Daten.Maschinenzeit_Maschine;
    this.spindleTimeRelative = (this.spindleTimeNumber / this.machineTimeNumber)*100; //Spindellaufzeit in %
  }

  onConsole(){
    console.log(this.spindleTimeRelative);
  }

  // Daten für Kreisdiagramm
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Spindellaufzeit (%)'],
    datasets: [{
      data: [this.spindleTimeRelative, 100-this.spindleTimeRelative],
      backgroundColor: ['blue', 'lightgray'], // Optional: Farben anpassen
      hoverBackgroundColor: ['darkblue', 'gray'] // Optional: Hover-Farben anpassen
    }]};
    public doughnutChartOptions: any = {
      //circumference: Math.PI,
      //rotation: -Math.PI,
      //cutout: '80%', // Für Chart.js Version 3.x verwenden Sie 'cutout' statt 'cutoutPercentage'
    };




  }


