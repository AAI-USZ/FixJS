function (data) {
  
    switch(data.message) {
        case "login":
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