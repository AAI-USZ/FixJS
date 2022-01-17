function (data) {
  
    switch(data.message) {
        case "login":
             this.insertBootScreen();
             this.startApp();
            break;
        case "noUser":
            this.authUser();
            break;
        case 'accessToken' :
            this.setAccessToken();
            break;
    }
}