function(cmd) {
    waiting_line();
    _cmd.attr("disabled", "disabled");

    $.ajax({
      type: "POST",
      url: "analytics/shell",
      data: { cmd : cmd },
      success: function(data) {
        result = eval('(' + data + ')');
        if (result.code == "success") {
          render_result(success(result.ms, result.content, result.op, result.result));
        } else {
          render_result(error(result.reason));
        }

        bindMessageSidebarClicks();

        eternalize(); // Move command out of input into static text.
      },
      error: function(data) {
        render_result(error("Internal error."));

        eternalize(); // Move command out of input into static text.
      }
    });
  }