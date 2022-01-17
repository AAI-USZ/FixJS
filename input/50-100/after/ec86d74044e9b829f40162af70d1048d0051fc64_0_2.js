function(comment, next) {
             comment.$feed.find('.new.comment').remove();
             comment.$feed.find('.comments').append(commentTmpl({
                 author: bucket.models('user').get(),
                 message: comment.msg
             }));
             next(comment);
         }