function(){
    var i,
        markers = [];

    for (i in this.markers) {
      markers.push(i);
    }
    this.removeMarkers(markers)
  }