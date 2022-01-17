function Event(smallimap, callback) {
        this.smallimap = smallimap;
        this.callback = callback;
        this.refresh = __bind(this.refresh, this);

        this.init = __bind(this.init, this);

        this.queue = [];
      }