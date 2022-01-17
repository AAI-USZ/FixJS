function(){
            // Show the nr of comments we are showing.
            var showingComments = json.total;
            if (widgetSettings.perPage < json.total) {
                showingComments = widgetSettings.perPage + extraComments;
            }
            $(commentsNumCommentsDisplayed, rootel).html(showingComments);
            // Puts the number of comments on the page
            $(commentsNumComments, rootel).html(json.total);
            // Change to "comment" or "comments"
            if (json.total === 1) {
                $(commentsCommentComments, rootel).text(sakai.api.i18n.getValueForKey("COMMENT_LC", "comments"));
            }


            // Change the page-number on the display
            $(commentsPager, rootel).pager({
                pagenumber: clickedPage,
                pagecount: Math.ceil(json.total / widgetSettings.perPage),
                buttonClickCallback: pagerClickHandler
            });

            if (json.total > widgetSettings.perPage) {
                $(commentsPager, rootel).show();
            }
            // Checks if the comments undefined or if it's length is 0
            displayCommentsPagedOrNot();
        }