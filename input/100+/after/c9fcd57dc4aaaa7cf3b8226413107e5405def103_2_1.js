function(d) {
    if (d.length === 0) {
      console.log('No graphs found');
    }
    var row = 0;
    $('div.graphs').append('<div class="row"></div>');
    for (var i=0; i < d.length; i++) {
      var c = $.parseJSON(d[i].configuration);
      var targets = "";
      for (var j=0; j < c.target.length; j++) {
        targets += '&target=' + c.target[j];
      }
      row = Math.floor( i / myColumns );
      var spanSize = ( 12 / myColumns );
      if (($('div.graphs div.row').length - 1) !== row) {
        $('div.graphs').append('<div class="row"></div>');
      }
      $($('div.graphs div.row')[row]).append('<span id="' + d[i].uuid + '" class="graph span' + spanSize + '"></div>');
      var myGraphWidth = $($('div.row span.graph')[0]).width();
      var myGraphUrl = graphiteUrl + '/render/?' + 'height=' + myGraphHeight + '&width=' + myGraphWidth + '&from=-' + myInterval + 'hours' + targets + '&' + myGraphOptions;
      var graphCloseIcon = '<img class="close hidden" src="/img/close.png" />';
      $($($($('div.graphs div.row')[row]) + 'span.graph.span' + spanSize)[i]).append('<label for="' + d[i].uuid + '">' + d[i].name + '</label>');
      $($($($('div.graphs div.row')[row]) + 'span.graph.span' + spanSize)[i]).append('<img src="' + encodeURI(myGraphUrl) + '" alt="' + d[i].name + '" name="' + d[i].uuid + '" />');
      $($($($('div.graphs div.row')[row]) + 'span.graph.span' + spanSize)[i]).append(graphCloseIcon);

    }
    selectActiveColumnButton();
    selectActiveIntervalButton();
  }