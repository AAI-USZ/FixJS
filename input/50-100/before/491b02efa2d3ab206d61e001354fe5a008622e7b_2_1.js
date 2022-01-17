function(markers, seriesData){
    var i;

    this.createMarkers(markers);
    for (i = 0; i < this.series.length; i++) {
      this.series[i].setValues(seriesData[i] || {});
    };
  }