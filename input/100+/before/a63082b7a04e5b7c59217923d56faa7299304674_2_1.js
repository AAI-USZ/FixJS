function displayTab() {
      var resource = location.hash
        , urlObj
        , pathname
        ;

      if (0 !== resource.indexOf('#/')) {
        location.hash = '#/' + defaultView;
        return;
      }
      
      urlObj = url.parse(resource.substr(1), true, true);

      pathname = urlObj.pathname.substr(1).replace('/', '_');
      $(uiView).hide();
      $(uiTab).removeClass('selected');
      if (0 === $(uiView + '[data-name=' + pathname + ']').length) {
        location.hash = '#/' + defaultView;
        return;
      }
      $(uiView + '[data-name=' + pathname + ']').show();
      $(uiTab + '.js-' + pathname).addClass('selected');
    }