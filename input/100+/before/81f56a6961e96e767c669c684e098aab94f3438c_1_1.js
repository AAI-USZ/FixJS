function initBrowserHooks () {
  var canvas = document.getElementById("canvas");
  var originalWidth = canvas.width;
  var originalHeight = canvas.height;

  // Be a good browser citizen!
  // Disabling commonly used hotkeys makes people rage.
  var shouldIgnoreEvent = function (evt) {
    if ((document.activeElement !== null)) {
      switch (document.activeElement.tagName.toLowerCase()) {
        case "canvas":
        case "body":
        case "document":
        case "button":
        case "span":
          break;
        default:
          return true;
      }
    }

    switch (evt.keyCode) {
      case 116: // F5
      case 122: // F11
        return true;
    }

    if (evt.ctrlKey) {
      switch (evt.keyCode) {
        case 67: // C
        case 78: // N
        case 84: // T
        case 86: // V
        case 88: // X
          return true;
      }
    }

    return false;
  };

  window.addEventListener(
    "keydown", function (evt) {
      if (shouldIgnoreEvent(evt))
        return;

      evt.preventDefault();
      var keyCode = evt.keyCode;
      var codes = keyMappings[keyCode] || [keyCode];        
      
      for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        if (Array.prototype.indexOf.call($jsilbrowserstate.heldKeys, code) === -1)
          $jsilbrowserstate.heldKeys.push(code);
      }
    }, true
  );

  window.addEventListener(
    "keyup", function (evt) {
      if (shouldIgnoreEvent(evt))
        return;

      evt.preventDefault();
      var keyCode = evt.keyCode;
      var codes = keyMappings[keyCode] || [keyCode];        
      
      $jsilbrowserstate.heldKeys = $jsilbrowserstate.heldKeys.filter(function (element, index, array) {
        return codes.indexOf(element) === -1;
      });
    }, true
  );

  canvas.addEventListener(
    "contextmenu", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }, true
  );

  var mapMouseCoords = function (evt) {
      var currentWidth = canvas.clientWidth;
      var currentHeight = canvas.clientHeight;

      // clientWidth/clientHeight do not report the effects of css transforms
      if (canvas.getClientRects) {
        var rects = canvas.getClientRects();
        currentWidth = rects[0].width;
        currentHeight = rects[0].height;
      }

      var x = evt.clientX - canvas.offsetLeft;
      var y = evt.clientY - canvas.offsetTop;

      x = x * originalWidth / currentWidth;
      y = y * originalHeight / currentHeight;

      $jsilbrowserstate.mousePosition[0] = x;
      $jsilbrowserstate.mousePosition[1] = y;
  };

  canvas.addEventListener(
    "mousedown", function (evt) {     
      mapMouseCoords(evt);

      var button = evt.button;
      if (Array.prototype.indexOf.call($jsilbrowserstate.heldButtons, button) === -1)
        $jsilbrowserstate.heldButtons.push(button);

      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }, true
  );

  canvas.addEventListener(
    "mouseup", function (evt) {
      mapMouseCoords(evt);
      
      var button = evt.button;
      $jsilbrowserstate.heldButtons = $jsilbrowserstate.heldButtons.filter(function (element, index, array) {
        (element !== button);
      });

      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }, true
  );

  canvas.addEventListener(
    "mousemove", function (evt) {
      mapMouseCoords(evt);
      
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }, true
  );
}