function setIndexFromTime(time) {
  for (fid in flights) {
    var flight = flights[fid];

    if (time < flight.t[0] || time > flight.t[flight.t.length-1]) {
      // out of range
      flight.dx = 0;
      flight.index = -1;
      continue;
    }

    var index = getNearestNumber(flight.t, time);

    if (time < flight.t[index]) {
      flight.dx = (time - flight.t[index-1])/(flight.t[index] - flight.t[index-1]);
      flight.index = index - 1;
    } else {
      flight.dx = (time - flight.t[index])/(flight.t[index+1] - flight.t[index]);
      flight.index = index;
    }

    if (flight.index == flight.t.length - 1) {
      flight.index--;
      flight.dx = 1;
    }
  }
}