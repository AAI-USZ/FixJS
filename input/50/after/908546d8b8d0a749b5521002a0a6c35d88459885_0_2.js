function(data) {
                    Log('info', 'Comment posted!');
                    $("#comment-form").val('');
                    Async.later(250, function(){
                        _this.comments.updateCommentsFor(current_stream_id);
                    });
                }