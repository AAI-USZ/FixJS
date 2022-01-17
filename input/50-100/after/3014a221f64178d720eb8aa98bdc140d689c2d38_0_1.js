function Game(seed, graphics) {
      this.seed = seed;
      this.tanks = [];
      this.bullets = [];
      this.obstacles = [new Obstacle(60, WIDTH / 2, HEIGHT / 2)];
      this.lt = 0;
      this.a = 0;
      if (graphics) {
        this.renderer = new Renderer(graphics);
      }
    }