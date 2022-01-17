function() {
    var benches = filter(ui.benchmarks, 'successful'),
        fastest = filter(benches, 'fastest'),
        fastestHz = getHz(fastest[0]),
        slowest = filter(benches, 'slowest');

    ui.render();
    setHTML('run', texts.run.again);
    setStatus(texts.status.again);

    // highlight result cells
    each(benches, function(bench) {
      var cell = $(prefix + (indexOf(ui.benchmarks, bench) + 1)),
          hz = getHz(bench),
          percent = (1 - (hz / fastestHz)) * 100,
          span = cell.getElementsByTagName('span')[0],
          text = 'fastest';

      if (indexOf(fastest, bench) > -1) {
        // mark fastest
        addClass(cell, text);
      }
      else {
        text = isFinite(hz)
          ? formatNumber(percent < 1 ? percent.toFixed(2) : Math.round(percent)) + '% slower'
          : '';

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