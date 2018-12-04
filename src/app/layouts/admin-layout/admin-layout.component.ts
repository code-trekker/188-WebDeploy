import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import axios from 'axios';



@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;    
  chart: any;
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  dataPoints = [];
  exercises;
  routines;
  workouts;
  weight_data: Array<any>;
  weight_dates : Array<any>;
  chart_data;

  constructor( public location: Location, private router: Router) {}

  // new Promise((resolve, reject) => { executer_fn });

  ngOnInit() {
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
          // if we are on windows OS we activate the perfectScrollbar function

          document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
      } else {
          document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      }
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else
                 window.scrollTo(0, 0);
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          let ps = new PerfectScrollbar(elemMainPanel);
          ps = new PerfectScrollbar(elemSidebar);
      }


    // code for weight chart
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/weight_chart',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id")
      }
    })
    .then(response => {
      this.weight_dates = response.data.weight_date;
      this.weight_data = response.data.weight_data.map(parseFloat);

      //   code for chart here
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels: this.weight_dates, // your labels array
          datasets: [
            {
              data: this.weight_data, // your data array
              borderColor: '#e0573a',
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          },
          title: {
            display: true,
            text: 'Weight Tracker',
            fontFamily: "'Montserrat', sans-serif",
            fontColor: '#272727',
            fontSize: 18,
            padding: 12
          },
          layout: {
            padding: {
                left: 10,
                right: 20,
                top: 0,
                bottom: 0
            }
          },
          gridLines: {
            drawOnChartArea: true
          },
        }
      });
    })
    .catch(error => {
      console.log(error)
    })

    // code for exercise table
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/exercises',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id")
      }
    })
    .then(response => {
      this.exercises = response.data.exercises;
      // console.log(this.exercises);
    })
    .catch(error => {
      console.log(error)
    })

    //code for routine table
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/routines',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id")
      }
    })
    .then(response => {
      this.routines = response.data.routines;
      // console.log(this.routines)
    })
    .catch(error => {
      console.log(error)
    });

    //code for workout table
    axios({
      method: 'post',
      url: 'https://wma-188.herokuapp.com/api/workouts',
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossorigin' : true
      },
      data: {
        user_id: localStorage.getItem("user_id")
      }
    })
    .then(response => {
      this.workouts = response.data.workouts;
      // console.log(this.workouts)
    })
    .catch(error => {
      console.log(error)
    });   
  }


  ngAfterViewInit() {
      this.runOnRouteChange();
  }
  isMaps(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
          return false;
      }
      else {
          return true;
      }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}
