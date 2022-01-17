function(data) {
      $("#document").html(Mustache.render(template, data));
      $("#document .tablesorter").tablesorter({
        sortList: [[1,1]]
      });
    }