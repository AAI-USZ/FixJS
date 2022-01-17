function(){
            // Show the nr of contentcomments we are showing.
            var showingComments = json.total;
            if (widgetSettings.perPage < json.total) {
                showingComments = widgetSettings.perPage;
            }
            $(contentcommentsNumCommentsDisplayed, rootel).html(showingComments);
            // Puts the number of contentcomments on the page
            $(contentcommentsNumComments, rootel).html(json.total);
            // Change to "comment" or "contentcomments"
            if (json.total === 1) {
                $(contentcommentsCommentComments, rootel).text(sakai.api.i18n.getValueForKey("COMMENT"));
            }

            if (json.total > widgetSettings.perPage) {
                $(contentcommentsPager, rootel).show();
            }
            // Checks if the contentcomments undefined or if it's length is 0
            displayCommentsPagedOrNot();
        }