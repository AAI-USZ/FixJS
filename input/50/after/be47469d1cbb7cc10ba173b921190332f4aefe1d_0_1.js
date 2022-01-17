function() {
        this.model.set("username", $(".username").val());
        $(".confirm-password").show();
        $(".password").focus();
      }