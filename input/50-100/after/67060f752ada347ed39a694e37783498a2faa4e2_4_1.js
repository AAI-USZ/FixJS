function() {
        if ($('#blogEntryContainer').length > 0) {
            App.BlogEntryFrontend.updateWithBlogPost($('#blogEntryContainer'), blogPostId);
        }
    }