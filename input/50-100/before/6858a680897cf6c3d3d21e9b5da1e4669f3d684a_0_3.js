function() {
            _this.api = false;
            _this.user = false;
            delete localStorage.token;
            delete localStorage.username;
            JQuery('.navbar a.user').html('Login').attr('href', 'assets/static/login.html');
            JQuery(".navbar a.user").fancybox();
        }