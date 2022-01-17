function responseReceived(r) {
    if (parseInt($('#custom').val()) == 1) {
      var $ths = $('#raw thead tr th').filter(':not(:first)').text('');
      selectCustomInputs().each(function(i) {
        $ths.eq(i).text($(this).siblings('span').text())
      });
      numberOfSeries = selectCustomInputs().length;
    }
    var series = [];
    var from = new Date(r.from * 1000);
    from = new Date(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
    for(var i = 0; i < numberOfSeries; ++i) {
      series[i] = [];
      for(var j = 0; j < r.days; ++j) {
       var value = r.data[i][j] == null ? 0 : r.data[i][j];
       d = new Date(from.getTime() + (j * 86400000))
       d = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
       series[i].push([d, value]);
      }
    }

    var $headers = $raw.siblings('thead').find('th');
    var graphData = []
    for (var i = 0; i < numberOfSeries; ++i) {
      graphData.push({
        label: $headers.eq(i+1).text(),
        lines: {show: true},
        points: {show: true},
        data: series[i]
      });
    }
    $.plot($graph, graphData, graphOptions);

    $raw.empty();
    var indexes = new Array();
    for(var i = 0; i < r.days; ++i) {
      var $row = $('<tr>').appendTo($raw);
      var date = new Date(from.getTime() + (i * 86400000));
      $('<td>').attr('nowrap', 'nowrap').text(new Date(date).ymd()).appendTo($row);
      for(var j = 0; j < numberOfSeries; ++j) {
        var value = r.data[j][i] == null ? 0 : r.data[j][i];
        $('<td>').text(value).appendTo($row);
      }
    }
  }