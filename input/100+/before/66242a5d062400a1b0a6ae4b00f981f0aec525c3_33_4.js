function sb_getAllElements() {
    // ID of elements to create references
    var elements = ['notification', 'time',
    'battery', 'wifi', 'data', 'flight-mode', 'signal',
    'tethering', 'alarm', 'bluetooth', 'mute',
    'recording', 'sms', 'geolocation', 'usb'];

    var toCamelCase = function toCamelCase(str) {
      return str.replace(/\-(.)/g, function replacer(str, p1) {
        return p1.toUpperCase();
      });
    }

    elements.forEach((function createElementRef(name) {
      this.icons[toCamelCase(name)] =
        document.getElementById('statusbar-' + name);
    }).bind(this));
  }