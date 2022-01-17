function() {
      $('#canvas-box')
        .hide()
        .empty()
        .append('<canvas id="graphcanvas">Your browser does not support graph visualization</canvas>');
      $('#graph-container').show();
      $('.pause').show();
      sylv.Sigma.init();
    }