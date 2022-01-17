function(callback) {
  jQuery.ajax({
    type: "GET",
    cache: false,
    dataType: "json",
    url: bridge.pluginRepository(),
    success: function(data) {
      if (data.repositoryVersion > 1) {
        callback(null, "Plugin list data format is too new. Please upgrade Builder.");
      } else {
        var result = [];
        for (var i = 0; i < data.plugins.length; i++) {
          if (data.plugins[i].browsers[bridge.browserType()]) {
            result.push(data.plugins[i]);
          }
        }
        callback(result);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      callback(null, "Unable to fetch plugins: " + (textStatus ? textStatus : "") + " " + (errorThrown ? errorThrown : ""));
    }
  });
}