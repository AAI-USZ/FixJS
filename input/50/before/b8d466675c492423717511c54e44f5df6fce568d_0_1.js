function(effect) {
        console.log("enqueued: " + effect);
        return this.queue.push(effect);
      }