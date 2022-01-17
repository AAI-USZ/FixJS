function (link) {
    link.addEventListener('click', function (event) {
      // Resolve anchor link
      var page = url.format( url.resolve(location, link.getAttribute('href')) );

      // Load new page
      piccolo.loadPage( page );
      event.preventDefault();
      return false;
    });
  }