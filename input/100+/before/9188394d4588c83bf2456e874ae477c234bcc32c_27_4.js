function kc_loadKeyboard(name) {
      var keyboard = Keyboards[name];
      if (keyboard.type !== 'ime')
        return;

      var sourceDir = './js/imes/';
      var imEngine = keyboard.imEngine;

      // Same IME Engine could be load by multiple keyboard layouts
      // keep track of it by adding a placeholder to the registration point
      if (this.IMEngines[imEngine])
        return;

      this.IMEngines[imEngine] = {};

      var script = document.createElement('script');
      script.src = sourceDir + imEngine + '/' + imEngine + '.js';

      // glue is a special object acting like the interface to let
      // the engine use methods from the controller.
      var glue = {
        path: sourceDir + imEngine,
        sendCandidates: function kc_glue_sendCandidates(candidates) {
          IMERender.showCandidates(candidates);
        },
        sendPendingSymbols:
          function kc_glue_sendPendingSymbols(symbols,
                                              highlightStart,
                                              highlightEnd,
                                              highlightState) {

          IMERender.showPendingSymbols(
            symbols,
            highlightStart, highlightEnd, highlightState
          );
        },
        sendKey: function kc_glue_sendKey(keyCode) {
          switch (keyCode) {
            case KeyEvent.DOM_VK_BACK_SPACE:
            case KeyEvent.DOM_VK_RETURN:
              window.navigator.mozKeyboard.sendKey(keyCode, 0);
              break;

            default:
              window.navigator.mozKeyboard.sendKey(0, keyCode);
              break;
          }
        },
        sendString: function kc_glue_sendString(str) {
          for (var i = 0; i < str.length; i++)
            this.sendKey(str.charCodeAt(i));
        },
        alterKeyboard: function kc_glue_alterKeyboard(keyboard) {
          _draw(keyboard, _currentInputType, _currentLayoutMode, _isUpperCase);
        }
      };

      script.addEventListener('load', (function IMEnginesLoaded() {
        var engine = this.IMEngines[imEngine];
        engine.init(glue);
      }).bind(this));

      document.body.appendChild(script);
    }