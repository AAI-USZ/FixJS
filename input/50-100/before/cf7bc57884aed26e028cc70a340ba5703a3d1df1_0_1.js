  getTripByUrl(url) {
    var tid = url.split('/');
    var ind = tid.length - 1;
    if (tid[ind] == '') ind--;
    var tid = tid[ind];
    return globals.trips.getTrip(tid);
  }
