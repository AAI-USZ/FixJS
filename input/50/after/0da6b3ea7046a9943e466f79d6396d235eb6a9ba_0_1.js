function(query) {
      var newquery = $("#query").val();
      newquery += " " + query;
      logstash.search($.trim(newquery));
    }