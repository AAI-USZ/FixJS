function(queue) {
    queue.getFirst()
        .on('playfinish.native', function() {
          queue.shift();
          if (queue.length) {
            playQueue(queue);
          } else {
            delete queuePool[queue.id];
          }
        })
        .play();
  }