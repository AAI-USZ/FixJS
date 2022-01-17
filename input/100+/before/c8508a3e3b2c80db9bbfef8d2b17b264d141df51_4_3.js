function(data) {
      var 
        type,
        titles = {
          local: "Existing",
          remote: "New",
          history: ""
        };

      $("#song-results").empty();
      if(data.query) {
        type = 'search';
        if(data.results.total) {
          $("#song-search-label").html("Showing results for <b>" + data.query + "</b>");
        } else {
          $("#song-search-label").html("Nothing found for <b>" + data.query + "</b> :-(");
        }
      } else {
        type = 'history';
        $("#song-search-label").html("Last played videos on " + data.channel + "</b>");
      }

      _.each(_.keys(titles), function(which) {
        if(data.results[which] && data.results[which].length) {
          if(titles[which]) {
            $("<h3>" + titles[which] + "</h3>").appendTo("#song-results");
          }
          _.each(data.results[which], function(row) {
            Song.format(row, type).appendTo("#song-results");
          });
        }
      });
    }