function(e) {
        var code = e.keyCode || e.which;
        
        // code == 13 is the enter key
        if ((code == 13) && (this.$el.find(".username").val() != "YourNewUserNameGoesHere")) {
          this.model.set("username",$(".username").val());      
          $(".confirm-password").show();
          $(".password").focus()
        }
      }