function(workspace) {
        // If in view mode, remove sidebar and drop zones
        if (Settings.MODE == "view" || Settings.MODE == "table") {
            workspace.toggle_sidebar();
            $(workspace.el).find('.sidebar_separator').remove();
            $(workspace.el).find('.workspace_inner')
                .css({ 'margin-left': 0 });
            $(workspace.el).find('.workspace_fields').remove();
        }

        // Remove toolbar buttons
        $(workspace.toolbar.el).find('.run').parent().removeClass('seperator');
        if (Settings.MODE == "view" || Settings.MODE == "table") {
            $(workspace.toolbar.el)
                .find(".run, .auto, .toggle_fields, .toggle_sidebar")
                .parent().remove();
        }
        if (Settings.MODE == "table") {
            $(workspace.toolbar.el).parent().remove();
        }

        // Toggle save button
        workspace.bind('query:result', function(args) {
            var isAllowed = args.data.cellset && 
                args.data.cellset.length > 0;
            puc.allowSave(isAllowed);
        });
    }