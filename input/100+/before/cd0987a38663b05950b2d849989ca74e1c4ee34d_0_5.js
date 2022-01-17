function() {
  // TODO: deal with sidebar being absent
  var maincontent = dojo.byId('maincontent');

  dojo.connect(maincontent, "onmouseout", function(e) {
    hideSignature();
  });

  dojo.connect(maincontent, "onmouseover", function(e) {
    showSignature();

    var node = e.target;
    var parentID = node.parentNode.id;

    // Indicate which line we're hovering
    if (isLineDiv(node)) {
      hoverLine(node);
    } else if (isLineDiv(node.parentNode)) {
      hoverLine(node.parentNode);
    }
  });

  dojo.connect(dojo.body(), "onclick", function(e) {
    var target = e.target;
    while (target.nodeName === 'SPAN') target = target.parentNode;
    if (target.nodeName === 'A') {
      var link = target;

      if (link.getAttribute("aria-haspopup")) {
        showInfo(link);
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
    } else {
        closeInfo();
    }
  });

  dojo.connect(dojo.body(), "onkeypress", function(e) {
    if (e.keyCode == dojo.keys.ESCAPE) {
      closeInfo();
      dojo.stopEvent(e);
    }
  });

  init();
}