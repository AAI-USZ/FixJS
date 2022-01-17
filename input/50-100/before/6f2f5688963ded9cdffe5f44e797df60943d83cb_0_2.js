function(text, type) {
      if (typeof type == "undefined")
        type = "success"

      var alert = $(".alert");

      if (alert.length == 0) {
        alert = $("<div class='alert alert-" + type + "' />")
        $("#content").prepend(alert)
      }

      alert.html(text);
    }