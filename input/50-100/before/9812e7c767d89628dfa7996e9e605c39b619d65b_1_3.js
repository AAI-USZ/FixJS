function(queue) {
    queue.currentAnimation = queue.shift()
        .on('playfinish', function() {
          if (queue.length) {
            playQueue(queue);
          } else {
            delete queuePool[queue.id];
          }
        })
        .play();
  }