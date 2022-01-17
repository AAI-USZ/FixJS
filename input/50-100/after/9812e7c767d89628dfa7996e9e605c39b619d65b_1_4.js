function(uid, animation) {
    var queue = queuePool[uid];
    if (queue) {
      queue.push(animation);
    } else {
      queue = queuePool[uid] = [animation];
      queue.id = uid;
      playQueue(queue);
    }
  }