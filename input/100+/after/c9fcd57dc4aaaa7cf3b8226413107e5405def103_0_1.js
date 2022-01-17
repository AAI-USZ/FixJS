function(d) {
    if (d.length === 0) {
      console.log('No dashboards found');
    }
    var row = 0;
    $('div.dashboards').append('<div class="row"></div>');
    for (var i=0; i < d.length; i++) {
      row = Math.floor( i / myColumns );
      var spanSize = ( 12 / myColumns );
      if (($('div.dashboards div.row').length - 1) !== row) {
        $('div.dashboards').append('<div class="row"></div>');
      }
      var cardWrapper = '<a href="/dashboards/' + d[i].uuid + '"><span id="' + d[i].uuid + '" class="dashboard span' + spanSize + '"></span></a>';
      $($('div.dashboards div.row')[row]).append(cardWrapper);
      var cardDashboardName = '<span class="name" id="' + d[i].uuid + '">' + d[i].name + '</span>';
      $($($($('div.dashboards div.row')[row]) + 'span.dashboard.span' + spanSize)[i]).append(cardDashboardName);
      var cardGraphCount = '<span class="count">' + d[i].graph_count + '</span>';
      $($($($('div.dashboards div.row')[row]) + 'span.dashboard.span' + spanSize)[i]).append(cardGraphCount);
      var cardCloseIcon = '<img class="close hidden" src="/img/close.png" />';
      $($($($('div.dashboards div.row')[row]) + 'span.dashboard.span' + spanSize)[i]).append(cardCloseIcon);
    }
  }