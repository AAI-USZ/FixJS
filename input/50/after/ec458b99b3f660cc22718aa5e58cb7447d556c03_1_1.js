function(login) {
        //todo: get login username when app started!
        var user = login?login.username:'admin';
        form = this.getView('ui_common.view.ChangePassword').create({user:user});
        form.show();
    }