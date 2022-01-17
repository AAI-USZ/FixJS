function getCurrentAuthCredentials() {
        var base_auth = "";
        if ($htauth_username.val().length==0 && Modernizr.localstorage) {
            base_auth = localStorage['mm_auth'] == undefined? "" : localStorage['mm_auth'];
        } else {
            base_auth = make_base_auth(
                $htauth_username.val(),
                $htauth_password.val()
            );
            if (Modernizr.localstorage) {
                localStorage['mm_auth'] = base_auth;
            }
        }
        return base_auth;
    }