function kr_draw(layout, language, scrollHandler) {

    //change scale (Our target screen width is 320px)
    //TODO get document.documentElement.style.fontSize
    //and use it for multipling changeScale deppending on the value of pixel density
    //used in media queries

    var content = '';
    var layoutWidth = layout.width || 10;
    var widthRatio = 10 / layoutWidth;

    resizeUI();

    layout.keys.forEach((function buildKeyboardRow(row, nrow) {
      content += '<div class="keyboard-row">';
      row.forEach((function buildKeyboardColumns(key, ncolumn) {
        var keyChar = key.value;
        var code = key.keyCode || keyChar.charCodeAt(0);
        var className = '';
        var alt = '';
        if (layout.alt) {
          if (layout.alt[keyChar] != undefined) {
            alt = layout.alt[keyChar];
          } else if (layout.alt[key.value] && IMEController.isUpperCase) {
            alt = layout.alt[key.value].toUpperCase();
          }
        }
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