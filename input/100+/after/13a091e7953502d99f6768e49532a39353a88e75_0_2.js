function(station, status) {
    var c, colors, _ref;
    colors = {
      C: 72,
      W: 'blue',
      N: 5
    };
    c = colors[status];
    if (station.locked) c = 'red';
    this.label(c, 'st', status);
    this.label(c, 'rssi', station.rssi);
    this.label(c, 'bssid', station.bssid);
    this.label(c, 'ch', station.channel);
    this.label(c, 'essid', station.essid);
    if (status === 'C') {
      this.label(c, 'pin', (_ref = station.session) != null ? _ref.pin : void 0);
      this.label(c, 'key', station.key);
      this.label(c, 'checked', Number(station.session.ki1) + Number(station.session.ki2));
    } else if (status === 'W') {
      this.label(c, 'progress', "" + (Number(station.attempts / 110).toFixed(2)) + "%");
      this.label(c, 'phase', station.session.phase);
      this.label(c, 'checks', Number(station.session.ki1) + Number(station.session.ki2));
      if (station.attempts > 10000 || station.session.phase === 1) {
        this.label(c, 'pin', "" + station.session.pin);
      }
    }
    if (station.device != null) {
      this.label(c, 'device', station.device.name);
      this.label(c, 'manuf.', station.device.manufacturer);
      this.label(c, 'model', "" + station.device.model + "/" + station.device.number);
    }
    if (station.locked) this.label(c, '!', 'LOCKED');
    charm.write('\n');
    return this;
  }