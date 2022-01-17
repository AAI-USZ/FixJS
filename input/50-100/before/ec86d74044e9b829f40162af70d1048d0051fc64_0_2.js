function(comment, next) {
             comment.$feed.find('.new.comment').remove();
             console.log(bucket.models('user').get());
             comment.$feed.find('.comments').append(commentTmpl({
                 author: bucket.models('user').get(),
                 message: comment.msg
             }));
             next(comment);
         }