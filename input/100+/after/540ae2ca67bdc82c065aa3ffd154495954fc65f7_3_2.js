function(bssid, phase, ki1, ki2, pins, filename) {
      var output;
      if (phase == null) {
        phase = 0;
      }
      if (ki1 == null) {
        ki1 = 0;
      }
      if (ki2 == null) {
        ki2 = 0;
      }
      if (filename == null) {
        filename = ("" + this.rvrPath + bssid + ".wpc").replace(/:/g, '');
      }
      if (pins == null) {
        pins = new Pins();
      }
      if (Array.isArray(pins)) {
        pins = new Pins(pins);
      } else if (typeof pins === 'string') {
        pins = new Pins(pins.split('\n'));
      }
      output = "" + ki1 + "\n" + ki2 + "\n" + phase + "\n" + (pins.buildEnum().join('\n'));
      return fs.writeFileSync(filename, output, 'utf8');
    }