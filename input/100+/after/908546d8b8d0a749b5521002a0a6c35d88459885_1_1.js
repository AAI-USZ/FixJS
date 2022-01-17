function(data)
            {
                var comments = [];
                for (var i in data)
                {
                    var newDate = new Date();
                    newDate.setTime( data[i][1]['timestamp']*1000);

                    var comment = data[i][1];
                    comment.id = data[i][0];
                    comment.time = jQuery.timeago(newDate);  
                    comments.push(comment);
                }
                var _data = {
                    user: _this.user,
                    comments: comments
                };
                console.log(_data);
                if (data.length > 0)
                {
                    var new_html = template(_data);
                    _elem.html(new_html);
                } else {
                    _elem.html('No comments.');
                }
            }