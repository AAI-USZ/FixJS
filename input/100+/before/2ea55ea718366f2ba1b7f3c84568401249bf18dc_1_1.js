function(data)
            {
                var _data = {
                    user: _this.user,
                    comments: data
                };
                var new_html = template(_data);
                _elem.html(new_html);
            }