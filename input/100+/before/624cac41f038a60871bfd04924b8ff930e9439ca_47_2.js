function() {
                $(topnavUserOptionsLoginButtonSigningIn).show();
                $(topnavUserOptionsLoginButtonCancel).hide();
                $(topnavuserOptionsLoginButtonLogin).hide();
                sakai.api.User.login({
                    'username': $(topnavUseroptionsLoginFieldsUsername).val(),
                    'password': $(topnavUseroptionsLoginFieldsPassword).val()
                }, function(success) {
                    if (success) {
                        var redirectURL = getRedirectURL();
                        if (redirectURL === window.location.pathname + window.location.search + window.location.hash) {
                            window.location.reload(true);
                        } else {
                            window.location = redirectURL;
                        }
                    } else {
                        $(topnavUserOptionsLoginButtonSigningIn).hide();
                        $(topnavUserOptionsLoginButtonCancel).show();
                        $(topnavuserOptionsLoginButtonLogin).show();
                        $(topnavUseroptionsLoginFieldsPassword).val('');
                        $(topnavUseroptionsLoginFieldsPassword).focus();
                        $(topnavUseroptionsLoginFieldsUsername).addClass('failedloginusername');
                        $(topnavUseroptionsLoginFieldsPassword).addClass('failedloginpassword');
                        $(topnavUserOptionsLoginForm).valid();
                        $(topnavUseroptionsLoginFieldsUsername).removeClass('failedloginusername');
                        $(topnavUseroptionsLoginFieldsPassword).removeClass('failedloginpassword');
                    }
                });
            }