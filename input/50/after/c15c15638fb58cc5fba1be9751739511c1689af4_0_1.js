function(index, cookie) {
        cookieParts = $.trim(cookie).split('=');
        if (cookieParts[0] == 'csrftoken') {
            csrfToken = cookieParts[1];
        }
    }