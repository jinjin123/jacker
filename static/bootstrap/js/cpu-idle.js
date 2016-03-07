$(function() {
    $(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        var chart;
        chart = new Highcharts.StockChart( {
            chart: {
                renderTo: 'idlecpu192_168_1_163',
                type: 'spline',
                animation: Highcharts.svg,
                // don't animate in old IE               
                marginRight: 10,
                events: {
                    load: function() {}
                }
            },
           rangeSelector: {
                buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                count: 1,
                type: 'hour',
                text: '1H'
            }, {
                count: 8,
                type: 'hour',
                text: '8H'
            }, {
                count: 1 ,
                type: 'day',
                text: '1D'
            }, {
                count: 7 ,
                type: 'day',
                text: '7D'
            }, {
                count: 1 ,
                type: 'month',
                text: '1Mon'
            }, {
                type: 'all',
                text: 'All'
            }],
            
//                inputEnabled: false,
                selected: 2
        },
            title: {
                text: 'CPU IDLE %'
            },
//            scrollbar: {
//                enabled: true
//            },
//            xAxis: {
//                type: 'datetime',
//                tickPixelInterval: 150,
//                min:9,
//                max:10
//            },
//            yAxis: [{
//                title: {
//                    text: 'CPU IDLE%'
//                },
//                plotLines: [{
//                    value: 0,
//                    width: 1,
//                    color: '#808080'
//                }]
//            },
//            {
//                title: {
       //             text: 'WAIT %'
//                },
//                plotLines: [{
//                    value: 0
//                    width: 1,
//                    color: '#808080'
//                }]
//            }],
            tooltip: {
                formatter: function() {
                    return '<b>' + chart.series[0].name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
//                    return '<b>' + ip + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
//            exporting: {
//                enabled: true
//            },
            credits: {
                enabled: false
            },
//            rangeSelector: {
//              buttons: [{
//                 count: 1,
//                  type: 'minute',
//                  text: '1M'
//              }, {
//                  count: 5,
//                  type: 'minute',
//                  text: '5M'
//              }, {
//                  type: 'all',
//                  text: 'All'
//              }],
//              inputEnabled: false,
//              selected: 0
//          },
            series: [{
                name: 'CPU IDLE',
                data: (function() { // generate an array of random data                             
                    var data = [],
                    time = (new Date()).getTime(),
                    i;
                    console.log(time);
                    for (i = -999; i <= 0; i++) {
                        data.push({
                            x: time + i*1000 ,
                       //     y: Math.random()
                            y: Math.round(Math.random()*100)
                        });
                    }
                    return data;
                })()
            },
]
//            {
//                name: 'CPU WAIT',
 //               data: (function() { // generate an array of random data                             
 //                   var data = [],
 //                   time = (new Date()).getTime(),
 //                   i;
 //                   for (i = -19; i <= 0; i++) {
 //                       data.push({
 //                           x: time + i * 5000,
 //                           y: Math.random()
 //                       });
 //                   }
 //                   return data;
 //               })()
//            }

        }); // set up the updating of the chart each second                     
        var series_used = chart.series[0];
        var ip = ''
 //       var series_wait = chart.series[1];
        setInterval(function() {
		jQuery.getJSON('/cpu_idle/', null,  
                          function(data) {  
                    //          var x = (new Date()).getTime();
                              var used = data[0];  
                              ip = data[1];
                              status_tag = data[2]
//                              if (data[2])
//                                  {
                                   var x = (new Date()).getTime();
//                                  }
//                              else
//                                  {
//                                   var x = data[1];
//                                  }
                                   series_used.addPoint([x, used], true, true);  
                                   });  	
//		jQuery.getJSON('/ajax_dict/', null,  
//                          function(data) {  
//                              var x = (new Date()).getTime();
//                              var wait = data;  
//                              series_wait.addPoint([x, wait], true, true);  
//                                   });  
        },
        5000);


//    $("#getcvs").click(function(){alert(chart.getCSV())});
//          alert(chart.getCSV())
     
//
//    $("#download").onclick(function(){
//          Highcharts.post('http://export.hcharts.cn/cvs.php', {
//            csv: chart.getCSV()
//          });
//        })

    });
});
