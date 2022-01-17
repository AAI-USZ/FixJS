function() {
      window.game.tools[window.viewModel.tool()].update();
      window.physics.update();
      return window.game.stage.update();
    }