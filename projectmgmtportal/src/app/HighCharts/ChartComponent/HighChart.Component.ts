import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts'
import { DashBoardService } from '../Services/DashbordChartService';


@Component({
    selector: 'high-chart',
    templateUrl: 'HighChart.Component.html',
    providers: [DashBoardService]
})

export class HighChartComponent implements OnInit {
    @ViewChild('chartTarget') public chartEl: ElementRef;
    private _chart: any;
    @Input() chartType: string;//OpenFinishedProjects
    @Input() chartIdentifier: string;//ActiveInactiveEmployees,

    constructor(private dashBoardService: DashBoardService) {

    }
    ngOnInit() {
        //ngAfterViewInit() {
        var opts: any = {};

        //get optionand series as per the chartIdentifier
        switch (this.chartIdentifier) {
            case "OpenFinishedProjects": {
                opts = {};
                this.dashBoardService.GetCompletedFinishedProjects().subscribe((seriesData: any) => {
                    opts = {};
                    opts = {
                        title: {
                            text: 'Completed/InProgress Projects',
                            x: -20 //center
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Project(s)',
                            colorByPoint: true,
                            data: seriesData
                        }]
                    };
                    this.Render(opts);
                });
                // opts = {
                //     title: {
                //         text: 'Completed Finished Projects',//GetCompletedFinishedProjects
                //         x: -20 //center
                //     },
                //     xAxis: {
                //         categories: ['Open', 'Finished']
                //     },
                //     series: [{
                //         name: '',
                //         data: [
                //             100, 200
                //         ]
                //     }]
                // };
                this.Render(opts);
                break;
            }
            case "ActiveInactiveEmployees": {
                this.dashBoardService.GetActiveInactiveEmployee().subscribe((seriesData: any) => {
                    opts = {};
                    opts = {
                        title: {
                            text: 'Active Inactive Employees',
                            x: -20 //center
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Employee(s)',
                            colorByPoint: true,
                            data: seriesData
                        }]
                    };
                    this.Render(opts);
                });

                break;
            }
            case "OpenFinishedStories": {
                this.dashBoardService.OpenFinishedStories().subscribe((seriesData: any) => {
                    opts = {};
                    opts = {
                        title: {
                            text: 'Active Inactive Stories',
                            x: -20 //center
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Stories(s)',
                            colorByPoint: true,
                            data: seriesData
                        }]
                    };
                    this.Render(opts);
                });

                break;
            }
            case "AllAllocatedUnAllocatedEmployee": {
                this.dashBoardService.GetAllAllocatedUnAllocatedEmployee().subscribe((seriesData: any) => {
                    opts = {};
                    opts = {
                        title: {
                            text: 'Allocated v/s Total Employee(s)',
                            x: -20 //center
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Stories(s)',
                            colorByPoint: true,
                            data: seriesData
                        }]
                    };
                    this.Render(opts);
                });

                break;
            }
            default: {
                //statements; 
                break;
            }
        }


    }
    Render(opts: any) {

        if (this.chartType && this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                type: this.chartType,
                renderTo: this.chartEl.nativeElement
            };

            this._chart = new Highcharts.Chart(opts);
        }
    }
}