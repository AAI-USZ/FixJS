function(e) {
      if (window.viewModel.state() === 'BUILD') {
        window.game.mouseX = (e.clientX - window.game.canvas_position.left) / window.game.scale;
        window.game.mouseY = (e.clientY - window.game.canvas_position.top) / window.game.scale;
        if ('mouse_move' in window.game.tools[window.viewModel.tool()]) {
          return window.game.tools[window.viewModel.tool()].mouse_move(e);
        }
      }
    }