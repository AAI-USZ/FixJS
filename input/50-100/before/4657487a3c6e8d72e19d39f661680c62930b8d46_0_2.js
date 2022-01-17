function (params) {
            var redirect = location.protocol + '//' + location.host + location.pathname,
                ggurl = 'https://accounts.google.com/o/oauth2/auth?' +
                    'client_id=' + $(document).slapos('store', 'ggappid') +
                    '&redirect_uri=' + encodeURIComponent(redirect) +
                    '&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email++https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile' +
                    '&response_type=token';
            $(document).slapos('store', 'token_type', 'Google');
            window.location.href = ggurl;
        }