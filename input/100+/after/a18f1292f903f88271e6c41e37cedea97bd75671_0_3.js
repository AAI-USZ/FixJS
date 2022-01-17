function() {
    var data = elemToData(this);
    var chart = new google.visualization.AreaChart(this);
    chart.draw(data, {
      width: 512,
      height: 150,
      title: $(this).data('title'),
      titleTextStyle: textcolor,
      titlePosition: "in",
      chartArea:{left:"0%",top:"0%",width:"100%",height:"100%"},
      backgroundColor: bg,
      vAxis: {
        maxValue: $(this).data('max'),
        minValue: -$(this).data('max'),
        baselineColor: strong,
        gridlines: {color:weak},
        minorGridlines: {color:weak}
      },
      legend: {position: "none"},
      axisTitlesPosition: "none",
      pointSize: 2
    });
  }