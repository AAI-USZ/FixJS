function() {
            _this.api = false;
            _this.user = false;
            Storage.erase('token');
            Storage.erase('username');
            _this.onLogout.apply();
            // $('#dropdown-text').removeAttr('data-toggle'); need to get this to work
        }