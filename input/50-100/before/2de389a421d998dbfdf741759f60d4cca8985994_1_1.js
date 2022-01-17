function() {
            localStorage.removeItem("player");

            if (localStorage["fb_token"]) {
                window.location.href = facebookApiLogoutUrl + localStorage["fb_token"];
            } else {
                Navigation.GoTo.Login();
            }

            return false;
        }