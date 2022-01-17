function() {
        if (!App.UserService.isLoggedIn()) {
            App.postLoginAction = function() {
                App.stack.push(App.AddPostScreen.get());
            }
            App.stack.push(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddPostScreen.get());
        }
        return false;
    }