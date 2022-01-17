function(e) {

        // Cmd-W closes the current tab if it can be closed
        if (e.metaKey && String.fromCharCode(e.which).toLowerCase() == 'w') {
          if (!HipChatHelper.in_lobby()) {
            HipChatHelper.close_current_tab();
            e.preventDefault();
            e.stopPropagation();
          }
        } else if (e.metaKey && String.fromCharCode(e.which).toLowerCase() > '0' && String.fromCharCode(e.which).toLowerCase() <= '9') {
          // Cmd-(1-9) switch to the window at position 1 through 9
          HipChatHelper.select_tab_by_position(String.fromCharCode(e.which).toLowerCase());
          e.stopPropagation();
        } else if (e.metaKey && e.shiftKey && e.which == 219) {
          // Cmd-{} moves to the previous or next tab
          chat.show_prev_tab();
          e.stopPropagation();
        } else if (e.metaKey && e.shiftKey && e.which == 221) {
          chat.show_next_tab();
          e.stopPropagation();
        }
      }