function(query_name) {
        Settings.ACTION = "OPEN_QUERY";
        var options = { 
            name: query_name,
            solution: Settings.GET.SOLUTION || "",
            path: Settings.GET.PATH || "",
            action: Settings.GET.ACTION || "",
            biplugin: true
        };
        var query = new SavedQuery(options);
        query.fetch({ success: query.move_query_to_workspace });
    }