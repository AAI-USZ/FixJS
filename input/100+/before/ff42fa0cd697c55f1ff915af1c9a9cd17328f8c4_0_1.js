function() {
    if (window.viewModel.state() === "BUILD") {
      return window.viewModel.state("PLAY");
    } else {
      if (window.viewModel.replay_mode()) {
        window.viewModel.state("BUILD");
        window.game.load_state(window.replay.state);
        return window.viewModel.state("PLAY");
      } else {
        return window.viewModel.state("BUILD");
      }
    }
  }