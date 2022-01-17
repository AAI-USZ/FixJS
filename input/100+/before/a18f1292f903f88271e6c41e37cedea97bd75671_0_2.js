function() {
    var data = elemToData(this);
    var chart = new google.visualization.AreaChart(this);
    chart.draw(data, {
      width: 747,
      height: 400,
      title: $(this).data('title'),
      titleTextStyle: textcolor,
      chartArea:{left:"5%",top:"5%",width:"78%",height:"90%"},
      backgroundColor: bg,
      vAxis: {textStyle: textcolor, gridlines: linecolor},
      legend: {textStyle: textcolor}
    });
  }