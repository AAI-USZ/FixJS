function(id) {
            if (id) {
                blogPostId = id;
            }

            if ($('#blogEntryContainer').length > 0) {
                App.BlogEntryFrontend.updateWithBlogPost($('#blogEntryContainer'), blogPostId);
            }
            if ($('#commentList').length > 0) {
                App.BlogEntryFrontend.updateWithComments($('#commentList'), blogPostId);
            }
        }