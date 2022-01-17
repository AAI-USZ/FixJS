function(comment, next) {
            console.log("[FeedsPast.Server] Save new comment");
            var authorId = self.bucket.models('user').get().id;

            $.ajax({
                url: '/story/:project/log/:id'.replace(':id', comment.id)
                                              .replace(':project', comment.project),
                type: 'POST',
                data: JSON.stringify({ author: authorId, message: comment.msg}),
                dataType: 'json',
                contentType: 'application/json',
                success: next
            });
            next(comment);
        }