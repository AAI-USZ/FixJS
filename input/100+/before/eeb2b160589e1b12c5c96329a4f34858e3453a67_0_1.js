function () {
  // if node
  return false;
  // end

  if (typeof WebSocket != 'undefined' && !('__initialize' in WebSocket))
    return false;

  if (window.ActiveXObject) {
    var control = null;
    try {
      control = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    } catch (e) { }
    if (control) {
      return true;
    }
  }
  else {
    for (var i = 0, l = navigator.plugins.length; i < l; i++) {
      for (var j = 0, m = navigator.plugins[i].length; j < m; j++) {
        if (navigator.plugins[i][j].description == 'Shockwave Flash') return true;
      }
    }
  }

  return false;
}