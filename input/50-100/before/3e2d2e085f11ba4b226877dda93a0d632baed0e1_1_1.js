function () {
      while (this.sprites.length > 0) {
        this.sprites[0].remove();
      }
      if (this.parent) {
        this.parent.sprites.splice(this.parent.sprites.indexOf(this), 1);
      }
      this.elem.parentNode.removeChild(this.elem);
      delete this.parent;
      delete this.cosmos;
    }