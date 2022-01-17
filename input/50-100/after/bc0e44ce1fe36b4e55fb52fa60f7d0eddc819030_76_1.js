function sb_handleEvent(evt) {
    switch (evt.type) {
      case 'screenchange':
        this.setActive(evt.detail.screenEnabled);
        break;

      case 'chargingchange':
      case 'levelchange':
      case 'statuschange':
        this.update.battery.call(this);
        break;

      case 'voicechange':
        this.update.signal.call(this);
        break;

      case 'datachange':
        this.update.data.call(this);
        break;

    }
  }