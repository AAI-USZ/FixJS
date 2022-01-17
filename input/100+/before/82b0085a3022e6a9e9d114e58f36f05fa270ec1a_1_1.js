function(rootNode) {
            // TODO: Error handling
            App.BlogEntryService.retrieveBlogEntries(function(result){
                $(rootNode).empty();
                appendBlogPosts(rootNode, result);
            });
        }