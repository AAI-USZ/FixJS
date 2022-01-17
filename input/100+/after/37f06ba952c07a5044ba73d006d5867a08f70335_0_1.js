function make_chart(type) {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                    }
                },
            plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function() {
                                return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                            }
                        }
                    }
                },
            series: [{
                        data: series[type],
                        type: 'pie'
                    }]
        });
    }