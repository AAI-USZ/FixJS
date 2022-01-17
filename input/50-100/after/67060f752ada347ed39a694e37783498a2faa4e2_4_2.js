function() {
        if (!App.UserService.isLoggedIn()) {
            App.stack.push(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddCommentScreen.get());
            App.AddCommentScreen.refresh(blogPostId);
        }
    }