function() {
      MoonLevel.__super__.stage.apply(this, arguments);
      this.terrain.stage();
      this.skybox.stage();
      if (!window.disableEnvironment) {
        this.scene.add(this.milk);
        this.scene.add(this.earth);
        this.scene.add(this.sun);
      }
      this.player.stage();
      game.client.enablePlayerUpdates();
      this.chat.stage();
      return this.score.observe('change:milk', function(count) {
        return document.getElementById('milk-count').innerHTML = count;
      });
    }