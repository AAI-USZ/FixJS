function qs_init() {
    this.getAllElements();

    this.overlay.addEventListener('click', this);
    window.addEventListener('utilitytrayshow', this);

    var self = this;

    // monitor data status
    SettingsListener.observe('ril.data.enabled', true, function(value) {
      self.data.dataset.enabled = value;
    });

    // monitor bluetooth status
    SettingsListener.observe('bluetooth.enabled', true, function(value) {
      self.bluetooth.dataset.enabled = value;
    });

    // monitor wifi status
    SettingsListener.observe('wifi.enabled', true, function(value) {
      self.wifi.dataset.enabled = value;
    });

  }