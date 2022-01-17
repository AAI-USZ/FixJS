function(data) {
        result = eval('(' + data + ')');
        if (result.code == "success") {
          render_result(success(result.ms, result.content, result.op, result.result));
        } else {
          render_result(error(result.reason));
        }

        bindMessageSidebarClicks();

        eternalize(); // Move command out of input into static text.
      }