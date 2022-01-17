function(e) {
                // if user is not signed in we need to check when they tab out of the login form and close the login menu
                if (!e.shiftKey && e.which == $.ui.keyCode.TAB) {
                    mouseOverSignIn = false;
                    $(topnavUserLoginButton).trigger("mouseout");
                    $("html").trigger("click");
                }
            }