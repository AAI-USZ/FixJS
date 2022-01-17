function() {
        console.log('#login');


        if(!User.prototype.isTokenExpired()) {
            appRouter.navigate("home", {
              trigger: true,
              replace: true
            });
        } else {
            this.changePage(new LoginView());
        }
    }