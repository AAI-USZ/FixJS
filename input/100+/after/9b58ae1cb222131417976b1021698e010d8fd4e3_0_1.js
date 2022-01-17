function() {
      var chart = nv.models.stackedAreaChart()
                  .margin({top: 10, bottom: 30, left: 40, right: 10})
                  .showControls(false)
                  .showLegend(false)
                  .style('stream');

      chart.yAxis
          .showMaxMin(false)
          .tickFormat(d3.format(',.1f'));

      d3.select("#exampleTwo")
        .datum(test_data)
          .transition().duration(500).call(chart);

      nv.utils.windowResize(chart.update);


      chart.stacked.dispatch.on('areaClick.updateExamples', function(e) {
        setTimeout(function() {
          mainExample.update();
          exampleOne.update();
          //exampleTwo.update();
          exampleThree.update();
        }, 100);
      })

      exampleTwo = chart;

      return chart;
  }