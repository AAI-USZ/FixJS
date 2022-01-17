function _handleResultsFormatter(item) {
        var query = $("input#quickOpenSearch").val();

        if (currentPlugin) {
            // Plugins use their own formatter or the default formatter
            var formatter = currentPlugin.resultsFormatter || defaultResultsFormatter;
            return formatter(item, query);
        } else {
            // Use the filename formatter
            query = StringUtils.htmlEscape(query);
            var filename = StringUtils.htmlEscape(_filenameFromPath(item, true));
            var rPath = StringUtils.htmlEscape(ProjectManager.makeProjectRelativeIfPossible(item));

            var displayName;
            if (query.length > 0) {
                // make the users query bold within the item's text
                displayName = filename.replace(
                    new RegExp(StringUtils.regexEscape(query), "gi"),
                    "<strong>$&</strong>"
                );
            } else {
                displayName = filename;
            }

            return "<li data-fullpath='" + encodeURIComponent(item) + "'>" + displayName +
                "<br /><span class='quick-open-path'>" + rPath + "</span></li>";
        }
    }