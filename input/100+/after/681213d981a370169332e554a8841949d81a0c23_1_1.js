function() {
    var data = elemToData(this);
    var chart = new google.visualization.ComboChart(this);
    chart.draw(data, {
      series: [
    { color: "blue", type: "area", lineWidth: 2 },
      { color: "red", type: "line", lineWidth: 2 }
    ],
      width: 460,
      height: 340,
      axisTitlePosition: 'none',
      chartArea:{left:"10%",top:"2%",width:"90%",height:"96%"},
      titlePosition: 'none',
      hAxis: {textPosition: "none"},
      vAxis: {textStyle: textcolor, gridlines: lineColor},
      backgroundColor: bg
    });
  }