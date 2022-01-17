function ls_getAllElements() {
    // ID of elements to create references
    var elements = ['mute', 'clock', 'date',
        'notification', 'notification-icon', 'notification-title',
        'notification-detail', 'notification-time',
        'area-unlock', 'area-camera', 'area-handle',
        'rail-left', 'rail-right',
        'passcode-code', 'passcode-pad',
        'camera'];

    var toCamelCase = function toCamelCase(str) {
      return str.replace(/\-(.)/g, function replacer(str, p1) {
        return p1.toUpperCase();
      });
    }

    elements.forEach((function createElementRef(name) {
      this[toCamelCase(name)] = document.getElementById('lockscreen-' + name);
    }).bind(this));

    this.overlay = document.getElementById('lockscreen');
    this.mainScreen = document.getElementById('screen');
  }