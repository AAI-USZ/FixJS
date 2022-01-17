function(e) {
    var section = e.state ? e.state['section'] : null;
    if (section) {
      // This is a popState event from hitting the Back button.  There will
      // have been a valid state object; show the section listed there.
      show_section(section);
    }
    else {
      // This is a popState event from loading the page.  If the URL has
      // an #id at the end of it, show that section; otherwise do nothing.
      var h = document.location.href;
      if (h.indexOf('#') != -1) {
        section = h.slice(h.indexOf('#')+1);
        if (section == '') section = 'news';
        show_section(section);
        window.scrollTo(0,0);
      }
    }
  }