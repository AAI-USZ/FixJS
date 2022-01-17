function onLinkClick(event) {
    // Resolve anchor link
    var page = url.format( url.resolve(location, this.getAttribute('href')) );

    // Load new page
    piccolo.loadPage( page );
    event.preventDefault();
    return false;
  }