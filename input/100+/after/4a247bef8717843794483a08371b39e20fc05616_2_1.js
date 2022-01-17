function(e) {
      if (window.viewModel.state() === 'BUILD') {
        window.game.mouse_down = true;
        if ('mouse_down' in window.game.tools[window.viewModel.tool()]) {
          return window.game.tools[window.viewModel.tool()].mouse_down(e);
        }
      }
    }