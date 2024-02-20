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
    const textToShow = `${roundedValue}%`;
    ctx.fillText(textToShow, centerX, centerY);
    ctx.restore();
  },
};

Chart.register(centerTextPlugin);

@Component({
  selector: 'app-anlageneffektivitaet',
  templateUrl: './anlageneffektivitaet.component.html',
  styleUrls: ['./anlageneffektivitaet.component.scss'],
})
export class AnlageneffektivitaetComponent implements OnInit {
  // Variablen
  data_local: any[] = [0];
  machineTimeString: string = '450';
  spindleTimeString: string = '153';
  spindleTimeNumber: number = 0;
  machineTimeNumber: number = 0;
  spindleTimeRelative: number = 0;
  dataArrayLength: number = 0;
  firstDate: string = '0';
  lastDate: string = '0';
  selectedDateIndex1: number = 0;
  selectedDateIndex2: number = 0;
  selectedDate1: string | null = null;
  selectedDate2: string | null = null;
  spindleTimeTimeFrame: string = '0';

  data_request = {
    MachineID: 1,
  };

  constructor(
    private apiService: ApiService,
    private globalService: GlobalService,
    private cookieService: CookieService
  ) {
    this.loadData();
    //this.requestData();
  }

  ngOnInit(): void { }

  //Daten importieren aus json-Datei
  loadData() {
    this.apiService.getJsonData().subscribe({
      next: (response) => {
        this.data_local = response;
        console.log(this.data_local);
        console.log(this.data_local[0][1].App_Daten.Maschinenzeit_Maschine);
        this.calculations();
      },
      error: (error) => {
        console.error('Ein Fehler ist aufgetreten!', error);
      },
    });
  }

  calculations() {
    //this.loadData();
    //this.requestData();
    console.log('calculations: ' + this.data_local);
    this.dataArrayLength = this.data_local.length;
    this.selectedDateIndex1 = this.dataArrayLength - 1;
    this.selectedDateIndex2 = 0;
    this.calculateRelativeSpindleTime();
    console.log(this.dataArrayLength);
    this.doughnutChartData = {
      datasets: [
        {
          data: [this.spindleTimeRelative, 100 - this.spindleTimeRelative],
          backgroundColor: ['#ed1c24', 'lightgray'],
          hoverBackgroundColor: ['#DF0101', 'gray'],
        },
      ],
    };
    this.calculateTimeFrame();
    console.log('selected date: ' + this.selectedDate1);
    this.setSelectedDate();
    console.log('selected date: ' + this.selectedDate1);
    this.setMachineStatus();
    console.log('rot: ' + this.rot);
    console.log('gelb: ' + this.gelb);
    console.log('gruen: ' + this.gruen);
  }

  calculateRelativeSpindleTime() {
    this.spindleTimeNumber =
      this.data_local[this.selectedDateIndex1][1].App_Daten
        .Maschinenzeit_Spindel -
      this.data_local[this.selectedDateIndex2][1].App_Daten
        .Maschinenzeit_Spindel;
    //console.log("DifSpindleTime: " + this.spindleTimeNumber);

    this.machineTimeNumber =
      this.data_local[this.selectedDateIndex1][1].App_Daten
        .Maschinenzeit_Maschine -
      this.data_local[this.selectedDateIndex2][1].App_Daten
        .Maschinenzeit_Maschine;
    //console.log("Dif MachineTime: " + this.machineTimeNumber);

    this.spindleTimeRelative =
      (this.spindleTimeNumber / this.machineTimeNumber) * 100; //Spindellaufzeit in %
  }

  calculateTimeFrame() {
    //aktuell wird Zeitraum als string gespeichert, zwischen erstem Wert und letzten Wert
    this.firstDate = this.data_local[this.selectedDateIndex1][0];
    this.lastDate = this.data_local[this.selectedDateIndex2][0];
    //console.log("first date: \n" + this.firstDate);
    //console.log("second date: \n" + this.lastDate);
  }

  setSelectedDate() {
    this.selectedDate1 = this.data_local[0][0];
    this.selectedDate2 = this.data_local[0][this.data_local.length - 1];
  }

  // Daten für Kreisdiagramm
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Spindellaufzeit (%)'],
    datasets: [
      {
        data: [this.spindleTimeRelative, 100 - this.spindleTimeRelative],
        backgroundColor: ['blue', 'lightgray'], // Optional: Farben anpassen
        hoverBackgroundColor: ['darkblue', 'gray'], // Optional: Hover-Farben anpassen
        borderWidth: [300],
      },
    ],
  };

  public doughnutChartOptions: any = {
    //circumference: Math.PI,
    //rotation: -Math.PI,
    //cutout: '80%', // Für Chart.js Version 3.x verwenden Sie 'cutout' statt 'cutoutPercentage'
  };
  updateChartData() {
    this.calculateRelativeSpindleTime(); // Annahme, dass diese Methode Ihre Daten berechnet und vorbereitet
    this.doughnutChartData = {
      datasets: [
        {
          data: [this.spindleTimeRelative, 100 - this.spindleTimeRelative],
          backgroundColor: ['#ed1c24', 'lightgray'],
          hoverBackgroundColor: ['#DF0101', 'gray'],
        },
      ],
    };
    // Hier könnten Sie weitere Logik zum Neuzeichnen des Charts haben, falls nötig
    // Zum Beispiel könnten Sie eine Logik haben, um das Chart.js-Objekt neu zu instanziieren oder zu aktualisieren.
  }

  requestData() {
    const requestOptions = {
      withCredentials: true,
    };
    console.log('gesendete Daten: ');
    console.log(this.data_request);
    this.apiService
      .postData(this.data_request, 'apiUrlGetData', requestOptions)
      .subscribe(
        (response) => {
          this.data_local = response;
          console.log('Erfolgreich:', response);
          this.calculations();
        },
        (errorResponse) => {
          console.log('Fehler:', errorResponse);
          window.alert(errorResponse.error.error);
        }
      );
  }

  onSelect1(date: any): void {
    this.selectedDateIndex1 = date;
    console.log('Ausgewählte Position: ', this.selectedDateIndex1);
    this.calculateTimeFrame();
    this.updateChartData();
  }

  onSelect2(date: any): void {
    this.selectedDateIndex2 = date;
    console.log('Ausgewählte Position: ', this.selectedDateIndex2);
    this.calculateTimeFrame();
    this.updateChartData();
  }

  //Ab hier Code zur Implementierung der Ampel
  //statische Variablen zum testen
  rot = 0;
  gelb = 0;
  gruen = 0;
  hover: string = '';
  setMachineStatus() {
    this.rot =
      this.data_local[
        this.dataArrayLength - 1
      ][1].App_Daten.Meldeleuchte_Alarm_steht_an;
    this.gelb =
      this.data_local[
        this.dataArrayLength - 1
      ][1].App_Daten.Meldeleuchte_Programm_ist_fertig;
    this.gruen =
      this.data_local[
        this.dataArrayLength - 1
      ][1].App_Daten.Meldeleuchte_Programm_laeuft;
  }

  //Ab hier Funktionen zur Auftragstabelle
  //Hier werden Daten aus der json extrahiert und nur das Datum und das NC-Programm gespeichert
  //Diese beiden Daten sollen dann in einer Tabelle angezeigt werden.
  extrahierteDaten: any[][] = []; //extrahiert NC-Programm und Datum
  programPuffer: string | null = null;
  datumPuffer: string | null = null;
  i: number = 0;
  tableHistorie() {
    this.i = 0;

     // Initialisieren Sie das Array hier

    for (let k = 0; k < this.dataArrayLength; k++) {
      console.log(k);
      this.datumPuffer = this.data_local[k][0];
      this.programPuffer = this.data_local[k][1].App_Daten.Aktuelles_NC_Programm;
      console.log("programPuffer: " + this.datumPuffer);
      if (
        this.i != 0 &&
        this.programPuffer != this.extrahierteDaten[this.i - 1][1]
      ) {
        console.log("Fall 1");
        this.extrahierteDaten.push([this.datumPuffer, this.programPuffer]);
        //this.extrahierteDaten[this.i][1] = this.programPuffer;
        this.i = this.i + 1;
      } else if (this.i == 0) {
        console.log('i: ' + this.i);
        this.extrahierteDaten.push([this.datumPuffer, this.programPuffer]);
        console.log(69);
        //this.extrahierteDaten[this.i][1] = this.programPuffer;
        this.i = this.i + 1;
      }
    }
    console.log('extrahierte Daten: ' + this.extrahierteDaten[0][1]);
  }
}
