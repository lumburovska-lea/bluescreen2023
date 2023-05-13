import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {RestService} from "../../rest.service";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { InfluencerPopUpComponent } from 'src/app/influencer-pop-up/influencer-pop-up.component';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private restService: RestService, 
        private route: ActivatedRoute,
        private modalService: NgbModal) { }

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public allInfluencers: Influencer[];

  ngOnInit() {

    this.getInfluencers()

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getInfluencers(){
    console.log("u dashboard")
    this.restService
        .getInfluencers()
        .subscribe((influencers: Influencer[]) => {
        console.log("vo hdashboardome e")
        console.log(influencers);
        this.allInfluencers = influencers;
    }, (err) => {
        console.log(err)
        });
  }

  openInfluencer(id: any) {
    const modalRef = this.modalService.open(InfluencerPopUpComponent);
    modalRef.componentInstance.id = id;
  }
}
  

export class Influencer {
  "_id" : string;
  "name": string;
  "surname": String;
  "email": String;
  "bio": string;
  "age": Number;
  "country": String;
  "tags": [{
    type: String
  }]
}
