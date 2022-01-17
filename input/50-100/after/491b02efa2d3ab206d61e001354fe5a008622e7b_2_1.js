function(key, marker, seriesData){
    var markers = {},
        data = [],
        values,
        i;

    markers[key] = marker;

    for (i = 0; i < seriesData.length; i++) {
      values = {};
      values[key] = seriesData[i];
      data.push(values);
    }
    this.addMarkers(markers, data);
  }