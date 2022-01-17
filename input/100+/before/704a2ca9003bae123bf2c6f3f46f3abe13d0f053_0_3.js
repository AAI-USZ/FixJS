function MoonLevel() {
      this.receiveMessage = __bind(this.receiveMessage, this);

      this.receivePlayerUpdate = __bind(this.receivePlayerUpdate, this);

      this.removePlayer = __bind(this.removePlayer, this);

      this.addPlayer = __bind(this.addPlayer, this);

      var flareColor, geometry, material, texture, textureFlare0, textureFlare2, textureFlare3,
        _this = this;
      MoonLevel.__super__.constructor.call(this, {
        bootstrap: true
      });
      this.terrain = new Milk.MoonTerrain;
      this.skybox = new Milk.Skybox("public/skybox");
      if (!window.disableEnvironment) {
        geometry = new THREE.PlaneGeometry(256, 256, 1, 1);
        material = new THREE.MeshPhongMaterial({
          ambient: 0xffffff,
          diffuse: 0xffffff,
          specular: 0xff9900,
          shininess: 64
        });
        this.milk = new THREE.Mesh(geometry, material);
        this.milk.doubleSided = true;
        this.milk.position.y = 5;
        this.notReady();
        geometry = new THREE.SphereGeometry(50, 20, 20);
        texture = new THREE.ImageUtils.loadTexture("/public/earth.jpg", null, function() {
          return _this.ready();
        });
        material = new THREE.MeshLambertMaterial({
          map: texture,
          color: 0xeeeeee
        });
        this.earth = new THREE.Mesh(geometry, material);
        this.earth.position.y = 79;
        this.earth.position.z = 500;
        this.notReady();
        textureFlare0 = THREE.ImageUtils.loadTexture("/public/lensflare0.png", null, function() {
          return _this.ready();
        });
        this.notReady();
        textureFlare2 = THREE.ImageUtils.loadTexture("/public/lensflare2.png", null, function() {
          return _this.ready();
        });
        this.notReady();
        textureFlare3 = THREE.ImageUtils.loadTexture("/public/lensflare3.png", null, function() {
          return _this.ready();
        });
        flareColor = new THREE.Color(0xffffff);
        THREE.ColorUtils.adjustHSV(flareColor, 0, -0.5, 0.5);
        this.sun = new THREE.LensFlare(textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor);
        this.sun.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        this.sun.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        this.sun.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
        this.sun.position.y = 30;
        this.sun.position.z = -500;
      }
      this.score = new Milk.Score;
      this.players = {};
      this.player = new Milk.Alien(Milk.OverheadText, Milk.Animation, Milk.Movable, Milk.Controllable);
      game.client.observe('addPlayer', this.addPlayer);
      game.client.observe('removePlayer', this.removePlayer);
      game.client.observe('receivePlayerUpdate', this.receivePlayerUpdate);
      this.chat = new Milk.NetworkChat;
      this.chat.observe('receiveMessage', this.receiveMessage);
      this.chat.observe('willSendMessage', function(data) {
        return data.voice = _this.player.voice;
      });
      this.player.voice = {
        pitch: Math.random() * 100
      };
    }