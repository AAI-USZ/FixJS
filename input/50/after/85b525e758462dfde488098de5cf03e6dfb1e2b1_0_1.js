function() {
      localStorage.removeItem("username");
      
//      this.authenticateAsPublic();
      //Destropy cookies, and reload the page, it will put the user at the login page.
      Utils.setCookie("username", undefined, -365);
      Utils.setCookie("token", undefined, -365);
      window.location.replace("/index.html")

    }