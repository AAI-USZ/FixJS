function(e) {
      if (window.viewModel.state() === 'BUILD') {
        window.game.mouseX = e.offsetX / window.game.scale;
        window.game.mouseY = e.offsetY / window.game.scale;
        if ('mouse_move' in window.game.tools[window.viewModel.tool()]) {
          return window.game.tools[window.viewModel.tool()].mouse_move(e);
        }
      }
    }