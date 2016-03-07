$(function() {
    $(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'memused',
                type: 'spline',
                animation: Highcharts.svg,
                // don't animate in old IE               
                marginRight: 10,
                events: {
                    load: function() {}
                }
            },
            title: {
                text: 'MEM'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: [{
                title: {
                    text: 'MEM USED'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            {
                title: {
                    text: 'MEM TOTAL'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            }],
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'MEM USED',
                data: (function() { // generate an array of random data                             
                    var data = [],
                    time = (new Date()).getTime(),
                    i;
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                })()
            },
            {
                name: 'MEM TOTAL',
               data: (function() { // generate an array of random data                             
                   var data = [],
                   time = (new Date()).getTime(),
                   i;
                   for (i = -19; i <= 0; i++) {
                       data.push({
                           x: time + i * 1000,
                           y: Math.random()
                       });
                   }
                   return data;
               })()
           }
]
        }); // set up the updating of the chart each second                     
        var series_used = chart.series[0];
        var series_wait = chart.series[1];
        setInterval(function() {
		jQuery.getJSON('/ajax_mem_used/', null,  
                          function(data) {  
                              var x = (new Date()).getTime();
                              var used = data;  
                              series_used.addPoint([x, used], true, true);  
                                   });  	
		jQuery.getJSON('/ajax_mem_total/', null,  
                          function(data) {  
                              var x = (new Date()).getTime();
                              var total = data;  
                              series_wait.addPoint([x, total], true, true);  
                                   });  
        },
        1000);
    });
});
