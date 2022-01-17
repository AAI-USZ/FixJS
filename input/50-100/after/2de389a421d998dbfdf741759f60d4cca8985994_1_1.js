function() {
            localStorage.removeItem("player");

            if (localStorage["fb_token"]) {
                var token = localStorage["fb_token"];
                localStorage.removeItem("fb_token");
                window.location.href = facebookApiLogoutUrl + token;
            } else {
                Navigation.GoTo.Login();
            }

            return false;
        }