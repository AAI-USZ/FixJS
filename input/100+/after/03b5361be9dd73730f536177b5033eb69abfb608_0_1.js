function(e, el) {
    var chart, chartSelector, data, date, hideSelector, historyPath, matrix, obj, options, readableDate, _k, _len2, _ref3;
    hideSelector = $(el).attr('data-hide-selector');
    chartSelector = $(el).attr('data-chart-selector');
    historyPath = $(el).attr('data-history-path');
    $(document.getElementById(hideSelector)).hide();
    $(document.getElementById(chartSelector)).toggle();
    matrix = [['Date', 'Score']];
    _ref3 = model.get(historyPath);
    for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
      obj = _ref3[_k];
      date = new Date(obj.date);
      readableDate = date.toISOString();
      matrix.push([readableDate, obj.value]);
    }
    data = google.visualization.arrayToDataTable(matrix);
    options = {
      title: 'History',
      backgroundColor: 'whiteSmoke'
    };
    chart = new google.visualization.LineChart(document.getElementById(chartSelector));
    return chart.draw(data, options);
  }