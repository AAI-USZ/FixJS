function() {
            _this.api = false;
            _this.user = false;
            delete localStorage.token;
            delete localStorage.username;
            JQuery('a#dropdown-text').html('Login').attr('href', 'assets/static/login.html').fancybox();
            // $('#dropdown-text').removeAttr('data-toggle'); need to get this to work
        }