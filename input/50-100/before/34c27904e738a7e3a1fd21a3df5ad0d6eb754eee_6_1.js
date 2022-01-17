function() {
        if (this.$el.find(".username").val() != "YourNewUserNameGoesHere") {
            this.model.set("username",$(".username").val());      
            $(".confirm-password").show();
        }
      }