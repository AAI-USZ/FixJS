function(uid, animation) {
    var queue = queuePool[uid];
    if (!queue) {
      queue = queuePool[uid] = [];
      queue.id = uid;
    }
    queue.push(animation);
    if (!queue.currentAnimation) {
      playQueue(queue);
    }
  }