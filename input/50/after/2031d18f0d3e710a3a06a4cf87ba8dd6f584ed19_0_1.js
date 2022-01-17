function(event) {
        event.init();
        return this.eventQueue.push(event);
      }