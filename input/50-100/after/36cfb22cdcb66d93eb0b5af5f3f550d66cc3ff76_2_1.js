function(callback) {
      if( this.model.get("userPrivate").username == "sapir" ){
        this.authenticate("sapir", "phoneme", callback);
      }else{
        //TODO show a modal instead of alert
        alert("Authenticating quickly, with just password, (if the user is not sapir, if its sapir, just authenticating him with his password)... At the moment I will use the pasword 'test' ");
        this.authenticate(this.model.get("userPrivate").username, "test" , callback );
      }
    }