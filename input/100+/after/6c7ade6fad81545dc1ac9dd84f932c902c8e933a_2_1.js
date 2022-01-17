function(query_name) {
        Settings.ACTION = "OPEN_QUERY";
        var options = {};
        var dataType = "text";
        if (Settings.BIPLUGIN) {
            var file = (Settings.GET.SOLUTION ? (Settings.GET.SOLUTION + "/") : "")
                        + (Settings.GET.PATH ? (Settings.GET.PATH + "/") : "")
                        + (Settings.GET.ACTION || "");
            options = {
                file: file
            };
        } else {
            
            options = {
                file: query_name
            }
        }
        var query = new SavedQuery(options);
        query.fetch({ success: query.move_query_to_workspace, dataType: dataType});
    }