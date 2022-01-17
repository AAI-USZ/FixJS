function kr_draw(layout, language, scrollHandler, flags) {
    flags = flags || {};

    //change scale (Our target screen width is 320px)
    //TODO get document.documentElement.style.fontSize
    //and use it for multipling changeScale deppending on the value of pixel density
    //used in media queries

    var content = '';
    var layoutWidth = layout.width || 10;
    var widthRatio = 10 / layoutWidth;

    resizeUI();

    layout.upperCase = layout.upperCase || {};
    layout.keys.forEach((function buildKeyboardRow(row, nrow) {
      content += '<div class="keyboard-row">';
      row.forEach((function buildKeyboardColumns(key, ncolumn) {
        var specialCodes = [
          KeyEvent.DOM_VK_BACK_SPACE,
          KeyEvent.DOM_VK_CAPS_LOCK,
          KeyEvent.DOM_VK_RETURN,
          KeyEvent.DOM_VK_ALT,
          KeyEvent.DOM_VK_SPACE
        ];
        var hasSpecialCode = specialCodes.indexOf(key.keyCode) > -1;

        var keyChar = key.value;
        if (flags.uppercase && !(key.keyCode < 0 || hasSpecialCode))
          keyChar = layout.upperCase[key.value] || key.value.toUpperCase();

        var code = key.keyCode || keyChar.charCodeAt(0);
        var className = '';
        var ratio = key.ratio || 1;

        //key with + key separation in rems
        var keyWidth = ratio;
        var dataset = [{'key': 'row', 'value': nrow}];
        dataset.push({'key': 'column', 'value': ncolumn});
        dataset.push({'key': 'keycode', 'value': code});

        if (language && code == -3) {
          dataset.push({'key': 'keyboard', 'value': language});
        }

        content += buildKey(keyChar, className, keyWidth, dataset);

      }));
      content += '</div>';
    }));

    // Append empty accent char menu and key highlight into content HTML
    content += '<span id="keyboard-accent-char-menu-out"><span id="keyboard-accent-char-menu"></span></span>';
    content += '<span id="keyboard-key-highlight"></span>';

    this.ime.innerHTML = content;
    this.menu = document.getElementById('keyboard-accent-char-menu');

    if (layout.needsCandidatePanel) {
      this.ime.insertBefore(candidatePanelToggleButtonCode(), this.ime.firstChild);
      this.ime.insertBefore(candidatePanelCode(scrollHandler), this.ime.firstChild);
      this.ime.insertBefore(pendingSymbolPanelCode(), this.ime.firstChild);
      showPendingSymbols('');
      showCandidates([], true);
    }
  }