function() {
            var redirectURL = getRedirectURL();
            $('.topnavigation_external_login_link').each(function(index, item) {
                $(item).attr('href', $.param.querystring($(item).attr('href'), {'url': redirectURL}));
            });
        }