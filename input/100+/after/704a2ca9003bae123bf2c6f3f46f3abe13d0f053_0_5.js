function(delta) {
      var id, mapHeightAtCamera, player, target, _ref;
      this.chat.update(delta);
      this.player.update(delta);
      _ref = this.players;
      for (id in _ref) {
        player = _ref[id];
        player.update(delta);
      }
      target = this.player.object3D.position.clone().subSelf(this.player.direction().multiplyScalar(-this.player.followDistance));
      this.camera.position = this.camera.position.addSelf(target.subSelf(this.camera.position).multiplyScalar(0.1));
      mapHeightAtCamera = this.terrain.heightAtPosition(this.camera.position);
      if (mapHeightAtCamera > this.player.object3D.position.y - 2) {
        this.camera.position.y = mapHeightAtCamera + 2;
      }
      this.camera.lookAt(this.player.object3D.position);
      this.pointLight.position = this.player.object3D.position.clone();
      this.pointLight.position.y += 10;
      if (!game.debug('nocrash')) {
        this.earth.rotation.y += 0.01;
        this.earth.rotation.x += 0.005;
        this.earth.rotation.z += 0.005;
      }
      return MoonLevel.__super__.update.apply(this, arguments);
    }