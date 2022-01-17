function() {
    var area_chart = new Highcharts.Chart({
    chart: {
      renderTo: document.getElementById(bean_render),
      inverted: true, 
      reflow: false, 
      width: 300
    },
    legend: { 
      floating: true,
      y: -35
    },
    title: { text: 'Beanplot' },
    subtitle: {
      text: "T-test p-value: ",
      style: { fontSize: '11px' }
    }, 
    yAxis: {
      labels: {
        enabled: true, 
        formatter: function () {
          return Math.abs(this.value);
        }
      }, 
      gridLineWidth: 1, 
    },
    xAxis: { 
      min: bin_low_val,
      max: bin_high_val,
      gridLineWidth: 1, 
      reversed: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        shadow: false,
        borderWidth: 0,
        pointWidth: 1, 
        allowPointSelect: false,
        enableMouseTracking: false, 
        showInLegend: false,
      }, 
      series: {
        animation: false,
        marker: {
          enabled: false
        }, 
        turboThreshold: 10
      },
      area: { 
        enableMouseTracking: false,
      }
    },
    series: [{
        type: 'column',
        data: new_output_data,
        name: 'sample2_numline',
        color: '#1A47C9',
        zIndex: 1,
      }, {
        type: 'area',
        data: new_output_kde,
        name: 'sample2_kde',
        color: '#9E8FC9',
      }, {
        type: 'column', 
        data: old_output_data, 
        name: 'sample1_numline',
        color: '#A1749C',
        zIndex: 1
      }, {
        type: 'area',
        data: old_output_kde,
        name: 'sample1_kde',
        color: '#E9F89C',
      }]
    });
    /*
    function(chart){
      varpoint=chart.series[0].data[8];
      varbox= text.getBBox();
      chart.renderer.rect(box.x-5,box.y-5,box.width+10,box.height+10,5).attr({
        fill:'#FFFFEF',
        stroke:'gray',
        'stroke-width':1,
        zIndex:4
      }).add();
    } */
    var time_plot = new Highcharts.Chart({
      chart: {
        renderTo: document.getElementById(time_render),
        zoomType: 'xy',
        reflow: false
      },
      legend: { 
        layout: 'vertical'
      },
      title: {
        text: "Values over Time"
      },
      subtitle: {
        text: "Chromatography -- Peak Width at Half Height for IDs -- 3QuartValue", 
        style: { fontSize: '11px' }
      }, 
      xAxis: { /*
        labels: {
          enabled: true, 
          formatter: function () {
            return Math.abs(this.value);
          }
        }, */
        gridLineWidth: 1, 
        type: 'datetime'
      },
      yAxis: { 
        gridLineWidth: 1, 
        reversed: false
      },
      
      plotOptions: {
        series: {
          animation: false,
          marker: {
            enabled: false
          }, 
          turboThreshold: 10
        },
      },
      tooltip: { crosshairs: true }, 
      series: [{
          type: 'line',
          data: new_data,
          name: 'sample2_numline',
          color: '#1A47C9',
          zIndex: 1,
        }, {
          type: 'line', 
          data: old_data, 
          name: 'sample1_numline',
          color: '#A1749C',
          zIndex: 1
        }]
    });
  }