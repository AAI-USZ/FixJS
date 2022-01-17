function(data) {
        if (data.code == "success") {
          render_result(success(data.ms, data.content, data.op, data.result));
        } else {
          render_result(error(data.reason));
        }
        bindMessageSidebarClicks();
        eternalize(); // Move command out of input into static text.
      }