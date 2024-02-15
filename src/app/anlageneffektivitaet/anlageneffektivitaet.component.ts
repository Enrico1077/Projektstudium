import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GlobalService } from '../global.service';
import { CookieService } from 'ngx-cookie-service';
import { Chart, ChartType, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);

const centerTextPlugin = {
  id: 'customCenterText',
  afterDraw: (chart: any) => {
    if (chart.config.type !== 'doughnut') return;
    const ctx = chart.ctx;
    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '25px Roboto';
    ctx.fillStyle = '#000';
    // Stellen Sie sicher, dass Sie den Text korrekt abrufen
    const value = `${chart.data.datasets[0].data[0]}%`;
    const roundedValue = parseFloat(value).toFixed(2);
    const textToShow = `${roundedValue}%`
    ctx.fillText(textToShow, centerX, centerY);
    ctx.restore();
  }
};

Chart.register(centerTextPlugin);

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
    private cookieService: CookieService,


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
      hoverBackgroundColor: ['darkblue', 'gray'], // Optional: Hover-Farben anpassen
      borderWidth: [300],
    }],
  };
    public doughnutChartOptions: any = {
      //circumference: Math.PI,
      //rotation: -Math.PI,
      //cutout: '80%', // Für Chart.js Version 3.x verwenden Sie 'cutout' statt 'cutoutPercentage'
    };




  }


