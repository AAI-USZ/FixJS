function(e) {
    var target = e.target;

    if (infoDiv != null &&
        infoDiv.style.display == 'block' &&
        !isEqualOrDescendant(infoDiv, target)) {
      closeInfo();
      e.preventDefault();
      return;
    }

    if ((target.nodeName == 'DIV' && target.id == 'code') ||
        (target.nodeName == 'SPAN' && target.className != 'k' && target.className != 'p')) {
      var s = window.getSelection();

      if (s.anchorNode) {
        word = getWordAtOffset(s.anchorNode.nodeValue, s.focusOffset);

        if (word.length > 0)
          showInfoDiv(target, word, null, e.layerY + 15);
        return;
      }
    }

    while (target.nodeName === 'SPAN') target = target.parentNode;
    if (target.nodeName === 'A' && e.button == 0) {
      var link = target;

      if (link.getAttribute("aria-haspopup")) {
        queryInfo(link);
        e.preventDefault();
      } else if (link.className == 'sidebarlink') {
        // Clicked outline link in sidebar, highlight link + line, close info (if open)
        link.scrollIntoView();
        dojo.query(".sidebar-highlighted").removeClass("sidebar-highlighted");
        dojo.addClass(link, "sidebar-highlighted");
        closeInfo();
        // Remove signature if visible, or it will cover this
        hideSignature();
      }
    }
  }