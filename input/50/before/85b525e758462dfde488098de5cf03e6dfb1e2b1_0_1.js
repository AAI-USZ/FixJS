function() {
      localStorage.removeItem("username");
      
      this.authenticateAsPublic();
    }