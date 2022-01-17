function() {
        return this.nextFetch = this.time() + this.get('redrawInterval') * 1000;
      }