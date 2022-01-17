function() {
        var user = {};
        user.username = inputUser.getData();
        user.password = inputPass.getData();

        // perform login
        App.UserService.login(user, App.postLoginAction,
            function(user) {
            },
            function(error) {
                App.scn.alert("Login", "Login failed");
            });

        App.scn.hidePopup();
    }