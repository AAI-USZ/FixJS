function(){
                var comment = $('#comment-form').val();

                _this.api.post_comment_to_streamid('streamid', comment, function(data) {
                    $("#comment-form").text('');
                    Log('info', 'Comment posted!');
                });
            }