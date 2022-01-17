function Game(seed, graphics) {
      this.seed = seed;
      this.tanks = [];
      this.bullets = [];
      this.lt = 0;
      this.a = 0;
      if (graphics) {
        this.renderer = new Renderer(graphics);
      }
    }