function(e) {
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
  }