function(login) {
        var user = login?login.username:this.logged.username,
            form = this.getView('ChangePassword').create({user:user});
        form.show();
    }