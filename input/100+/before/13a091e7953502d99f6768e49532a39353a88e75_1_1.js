function(bssid, filename) {
      var ki1, ki2, phase, pin, pset, session;
      if ((bssid != null) && !(filename != null)) {
        filename = ("" + this.rvrPath + bssid + ".wpc").replace(/:/g, '');
      }
      try {
        session = fs.readFileSync(filename, 'utf8');
        session = session.split("\n");
      } catch (error) {
        session = [0, 0, 0, []];
      }
      pset = new Pins(session.slice(3, -1));
      ki1 = session[0];
      ki2 = session[1];
      phase = session[2];
      switch (phase) {
        case '2':
          pin = pset.get(ki1, ki2);
          break;
        case '1':
          pin = pset.keyAt(1, ki1);
          break;
        case '0':
          pin = null;
      }
      return {
        phase: phase,
        pin: pin,
        Pins: pset,
        ki1: ki1,
        ki2: ki2
      };
    }