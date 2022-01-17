function(window) {
  var navigator = window.navigator;
  if (('mozBluetooth' in navigator) && navigator.mozBluetooth)
    return navigator.mozBluetooth;

  var enabled = false;
  return {
    get enabled() {
      return enabled;
    },
    setEnabled: function(value) {
      enabled = value;
      return { // fake DOM request
        set onsuccess(callback) { setTimeout(callback, 500); },
        set onerror(callback) {}
      };
    }
  };
}