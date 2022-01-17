function(station, status) {
    var progress, _ref;
    if (station.locked) charm.display('dim');
    if (status === 'C') {
      cwrite(57, "[C] rssi:" + station.rssi + " bssid:" + station.bssid + " ch:" + ch + " essid:'" + station.essid + "'\n");
      cwrite(57, " |- pin:" + ((_ref = station.session) != null ? _ref.pin : void 0) + " key:'" + station.key + "'");
    } else if (status === 'W') {
      progress = Number(station.attempts / 110).toFixed(2) + '%';
      if (station.attempts > 10000 || station.session.phase === 1) {
        progress += " pin:" + station.session.pin + "____";
      }
      cwrite('magenta', "[W] rssi:" + station.rssi + " bssid:" + station.bssid + " ch:" + ch + " essid:'" + station.essid + "'\n");
      cwrite('magenta', " |- eliminated:" + station.attempts + "/11000 ~" + progress + " phase:" + station.phase);
    } else if (status === 'N') {
      cwrite('blue', "[C] rssi:" + station.rssi + " bssid:" + station.bssid + " ch:" + ch + " essid:'" + station.essid + "'");
    }
    if (station.locked) {
      cdwrite('bright', 'red', ' locked\n');
    } else {
      cwrite('green', ' unlocked\n');
    }
    cdwrite('reset', '\n');
    return this;
  }