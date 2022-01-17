function(e) {
      if (window.viewModel.state() === 'BUILD') {
        if (e.clientX > window.game.canvas_position.left && e.clientY > window.game.canvas_position.top && e.clientX < window.game.canvas_position.left + window.game.canvas_width && e.clientY < window.game.canvas_position.top + window.game.canvas_height) {
          window.game.mouse_down = true;
          if ('mouse_down' in window.game.tools[window.viewModel.tool()]) {
            return window.game.tools[window.viewModel.tool()].mouse_down(e);
          }
        }
      }
    }