function(limit) {
             return Action(function(feed, next) {
                 elts.$feedsList.prepend(feedTmpl({
                     feed: feed,
                     commentView: function(comment) {
                         return commentTmpl({
                             author: comment.author,
                             message: comment.message
                         });
                     }
                 }));

                 var currentFeedsSize = elts.$feedsList.find('li').length;
                 if(currentFeedsSize > limit) elts.$feedsList.find('li:last').remove();
                 next(feed);
             });
         }