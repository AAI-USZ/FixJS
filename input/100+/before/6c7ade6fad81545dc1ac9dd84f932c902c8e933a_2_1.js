function(query_name) {
        Settings.ACTION = "OPEN_QUERY";
        var options = {};
        var dataType = "json"
        if (Settings.BIPLUGIN) {
            options = {
                name: query_name,
                solution: Settings.GET.SOLUTION || "",
                path: Settings.GET.PATH || "",
                action: Settings.GET.ACTION || "",
                biplugin: true
            };
        } else {
            dataType = "text"
            options = {
                file: query_name,
                dataType: "text"
            }
        }
        var query = new SavedQuery(options);
        query.fetch({ success: query.move_query_to_workspace, dataType: dataType});
    }