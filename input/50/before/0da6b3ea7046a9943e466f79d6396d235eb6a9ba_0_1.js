function(query) {
      var newquery = $("#query").val();
      newquery += " " + query;
      logstash.search(newquery.trim());
    }