function buildPanel() {
    if ($('.debug')[0]) {
      $panel = $(''+
        '<div id="debug-panel">'+
          '<div class="inner">'+
            '<span>Debug panel</span>'+
            '<a class="debug-toggle-boxes" href="#toggle">Boxes</a>'+
            '<a class="debug-toggle-grid" href="#toggle">Grid</a>'+
            '<a href="/styleguide">Styleguide</a>'+
          '</div>'+
        '</div>').prependTo('body');
    }
    $panel.find('.inner').append(buildColorSquares());
  }