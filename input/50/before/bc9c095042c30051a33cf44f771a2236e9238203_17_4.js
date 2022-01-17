function(index, item){
                $(item).attr('href', $.param.querystring($(item).attr('href'), {"url": redirectURL}));
            }