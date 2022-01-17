function(callback) {
      if( this.model.get("userPrivate").get("username") == "sapir" ){
        this.authenticate("sapir", "phoneme", callback);
      }else{
        $("#quick-authenticate-modal").modal("show");
        window.hub.subscribe("quickAuthenticationClose",function(){
          //TODO show a modal instead of alert
//          alert("Authenticating quickly, with just password, (if the user is not sapir, if its sapir, just authenticating him with his password)... At the moment I will use the pasword 'test' ");
          window.appView.authView.authenticate(window.app.get("authentication").get("userPrivate").get("username"), $("#quick-authenticate-password").val() , callback );
          $("#quick-authenticate-modal").modal("hide");
          $("#quick-authenticate-password").val("");
//          window.hub.unsubscribe("quickAuthenticationClose", null, this);
        }, this);
      }
    }