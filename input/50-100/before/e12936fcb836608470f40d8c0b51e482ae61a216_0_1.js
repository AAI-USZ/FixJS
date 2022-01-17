function Simulation(opts) {
      var default_config;
      default_config = {
        rate: 1000,
        max_days: 250
      };
      this.config = extend({}, default_config, opts);
      this.day = 0;
      this.interval_id = null;
      this.board = new Board(this.config.board.width, this.config.board.height);
    }