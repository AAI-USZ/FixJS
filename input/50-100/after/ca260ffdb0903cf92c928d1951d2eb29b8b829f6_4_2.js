function() {
        if (!App.UserService.isLoggedIn()) {
            App.postLoginAction = function() {
                App.stack.push(App.AddCommentScreen.get());
            }
            App.stack.push(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddCommentScreen.get());
        }
    }