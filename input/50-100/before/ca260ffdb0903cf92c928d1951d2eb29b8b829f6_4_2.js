function() {
        if (!App.UserService.isLoggedIn()) {
            App.postLoginAction = function() {
                App.stack.push(App.AddCommentScreen.get());
            }
            App.scn.showPopup(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddCommentScreen.get());
        }
    }