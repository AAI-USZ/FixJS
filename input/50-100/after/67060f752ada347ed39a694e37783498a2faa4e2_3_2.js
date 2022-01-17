function() {
        if (!App.UserService.isLoggedIn()) {
            App.stack.push(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddPostScreen.get());
        }
        return false;
    }