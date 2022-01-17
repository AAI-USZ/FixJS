function(cmd) {
    if (cmd == "clear") {
      clear();
      return;
    }
    
    waiting_line();
    _cmd.attr("disabled", "disabled");

    $.ajax({
      type: "POST",
      url: "analytics/shell",
      dataType: "json",
      data: { cmd : cmd },
      success: function(data) {
        if (data.code == "success") {
          render_result(success(data.ms, data.content, data.op, data.result));
        } else {
          render_result(error(data.reason));
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