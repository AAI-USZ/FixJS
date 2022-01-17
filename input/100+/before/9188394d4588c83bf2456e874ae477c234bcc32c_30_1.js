function kr_draw(layout, flags) {
    flags = flags || {};

    // change scale (Our target screen width is 320px)
    // TODO get document.documentElement.style.fontSize
    // and use it for multipling changeScale deppending on the value of pixel
    // density used in media queries

    var content = '';
    var layoutWidth = layout.width || 10;
    var totalWidth = document.getElementById('keyboard').clientWidth;
    var placeHolderWidth = totalWidth / layoutWidth;
    var inputType = flags.inputType || 'text';

    layout.upperCase = layout.upperCase || {};
    layout.keys.forEach((function buildKeyboardRow(row, nrow) {
      content += '<div class="keyboard-row">';
      row.forEach((function buildKeyboardColumns(key, ncolumn) {

        var keyChar = key.value;
        var overrides = layout[flags.inputType + 'Overrides'];

        // Handle uppercase
        if (flags.uppercase) {
          keyChar = getUpperCaseValue(key);
        }

        // Handle override
        var code;
        if (overrides && overrides[keyChar]) {
          keyChar = overrides[keyChar];
          code = keyChar.charCodeAt(0);

        } else {
          code = key.keyCode || keyChar.charCodeAt(0);
        }

        var className = isSpecialKey(key) ? 'special-key' : '';
        var ratio = key.ratio || 1;

        var keyWidth = placeHolderWidth * ratio;
        var dataset = [{'key': 'row', 'value': nrow}];
        dataset.push({'key': 'column', 'value': ncolumn});
        dataset.push({'key': 'keycode', 'value': code});
        if (key.compositeKey) {
          dataset.push({'key': 'compositekey', 'value': key.compositeKey});
        }

        content += buildKey(keyChar, className, keyWidth, dataset);

      }));
      content += '</div>';
    }));

    // Append empty accent char menu and key highlight into content HTML
    content += '<span id="keyboard-accent-char-menu-out">' +
               '<span id="keyboard-accent-char-menu"></span></span>';
    content += '<span id="keyboard-key-highlight"></span>';

    this.ime.innerHTML = content;
    this.menu = document.getElementById('keyboard-accent-char-menu');
    this.menu.addEventListener('scroll', onScroll);

    // Builds candidate panel
    if (layout.needsCandidatePanel) {
      this.ime.insertBefore(
        candidatePanelToggleButtonCode(), this.ime.firstChild);
      this.ime.insertBefore(candidatePanelCode(), this.ime.firstChild);
      this.ime.insertBefore(pendingSymbolPanelCode(), this.ime.firstChild);
      showPendingSymbols('');
      showCandidates([], true);
    }

    resizeUI(layout);
  }