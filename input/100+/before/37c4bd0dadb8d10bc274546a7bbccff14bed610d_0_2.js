function() {
    var benches = filter(ui.benchmarks, 'successful'),
        fastest = filter(benches, 'fastest'),
        slowest = filter(benches, 'slowest');

    ui.render();
    setHTML('run', texts.run.again);
    setStatus(texts.status.again);

    // highlight result cells
    each(benches, function(bench) {
      var percent,
          cell = $(prefix + (indexOf(ui.benchmarks, bench) + 1)),
          hz = bench.hz,
          span = cell.getElementsByTagName('span')[0],
          text = 'fastest';

      if (indexOf(fastest, bench) > -1) {
        // mark fastest
        addClass(cell, text);
      }
      else {
        percent = Math.round((1 - hz / fastest[0].hz) * 100);
        text = isFinite(hz) ? percent + '% slower' : '';

        // mark slowest
        if (indexOf(slowest, bench) > -1) {
          addClass(cell, 'slowest');
        }
      }
      // write ranking
      if (span) {
        setHTML(span, text);
      } else {
        appendHTML(cell, '<span>' + text + '</span>');
      }
    });

    ui.browserscope.post();
  }