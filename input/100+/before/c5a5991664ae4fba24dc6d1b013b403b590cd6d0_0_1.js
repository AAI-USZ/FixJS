function(event) {
    var fb, response;
    event.preventDefault();
    $(event.currentTarget).attr("disabled", "true");
    fb = new Feedback({
      contact: $("#id_contact").val(),
      feedback: $("#id_feedback").val()
    });
    response = function(model, response) {
      $(event.currentTarget).removeAttr("disabled");
      $("#dialog form").hide("fast");
      $("#dialog h2").html("Thanks for your feedback!").after($("<h4>").html("You will be redirected to complimentary poni!").css("text-align", "center"));
      return setTimeout('app.random();', 4000);
    };
    fb.save(void 0, {
      success: response,
      error: response
    });
  }