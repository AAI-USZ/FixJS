function(index, cookie) {
        cookieParts = $.trim(cookie).split('=');
        if (cookie_parts[0] == 'csrftoken') {
            csrfToken = cookieParts[1];
        }
    }