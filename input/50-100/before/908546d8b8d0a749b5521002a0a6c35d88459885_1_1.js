function(elem)
        {
            _elem = JQuery(elem);
            JQuery.ajax({
                cache: false,
                url: 'assets/templates/comments.html?nocache=' + (new Date()).getTime(),
                dataType: 'html',
                success: function(html){
                    template = Handlebars.compile(html);
                }
            })
        }