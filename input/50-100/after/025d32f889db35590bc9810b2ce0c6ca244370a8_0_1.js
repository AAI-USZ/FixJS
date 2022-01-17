function (err, reply) {
            if (err) {
                var cur = self.queue[index];

                if (cur) {
                  if (typeof cur[cur.length - 1] === "function") {
                      cur[cur.length - 1](err);
                  } else {
                      throw new Error(err);
                  }

                  // why oh why?
                  self.queue.splice(index, 1);
                }
            }
        }