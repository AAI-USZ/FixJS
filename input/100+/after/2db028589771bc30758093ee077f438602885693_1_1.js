function() {
    createController();
    controller.renderDialog("test_template_with_input", {
      title: "Test title",
      message: "Test message"
    });

    controller.start();


    var submitCalled = 0;
    controller.submit = function() {
      submitCalled++;
    };

    // synthesize the entire series of key* events so we replicate the behavior
    // of keyboard interaction.  The order of events is keydown, keypress,
    // keyup (http://unixpapa.com/js/key.html).
    var e = jQuery.Event("keydown", { keyCode: 13, which: 13 });
    $("#templateInput").trigger(e);

    var e = jQuery.Event("keypress", { keyCode: 13, which: 13 });
    $("#templateInput").trigger(e);

    var e = jQuery.Event("keyup", { keyCode: 13, which: 13 });
    $("#templateInput").trigger(e);

    equal(submitCalled, 1, "submit called a single time");
  }