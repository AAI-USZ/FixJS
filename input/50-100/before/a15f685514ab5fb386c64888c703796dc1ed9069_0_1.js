function() {
    $.ajax({
      url: "/",
      type: "POST",
      data: {
        raw: $("textarea").val()
      },
      success: function(response) {
        $(".output").html(response);
      },
      error: function(error) {
        $(".output").text("Crap, something went wrong!");
      }
    });
  }