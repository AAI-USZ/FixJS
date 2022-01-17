function (params) {
            var redirect = window.location.protocol + '//' + window.location.host + window.location.pathname + '#/dashboard/' + '?',
                fburl = 'https://www.facebook.com/dialog/oauth?' +
                    'client_id=' + $(document).slapos('store', 'fbappid') +
                    '&redirect_uri=' + encodeURIComponent(redirect) +
                    '&scope=email' +
                    '&response_type=token';
            // set token type to Facebook for js library
            $(document).slapos('store', 'token_type', 'Facebook');
            window.location.href = fburl;
        }