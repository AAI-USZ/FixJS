function () {
      zap.remove_sprites(this);
      if (this.parent) {
        this.parent.sprites.splice(this.parent.sprites.indexOf(this), 1);
      }
      this.elem.parentNode.removeChild(this.elem);
      delete this.parent;
      delete this.cosmos;
    }