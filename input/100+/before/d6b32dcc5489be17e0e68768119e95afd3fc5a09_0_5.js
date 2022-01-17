function normalizeReachableBlocks() {
      var root = this.bytecodes[0];

      /* The root must not have preds! */
      assert(root.preds.length === 0);

      const ONCE = 1;
      const BUNCH_OF_TIMES = 2;
      const BlockSet = this.BlockSet;

      var blocks = [];
      var visited = {};
      var ancestors = {};
      var worklist = [root];
      var node;
      var level = root.level || 0;

      ancestors[root.bid] = true;
      while (node = worklist.top()) {
        if (visited[node.bid]) {
          if (visited[node.bid] === ONCE) {
            visited[node.bid] = BUNCH_OF_TIMES;
            blocks.push(node);

            /* Doubly link reachable blocks. */
            var succs = node.succs;
            for (var i = 0, j = succs.length; i < j; i++) {
              succs[i].preds.push(node);
            }
          }

          ancestors[node.bid] = false;
          worklist.pop();
          continue;
        }

        visited[node.bid] = ONCE;
        ancestors[node.bid] = true;

        var succs = node.succs;
        for (var i = 0, j = succs.length; i < j; i++) {
          var s = succs[i];
          if (s.level < level) {
            continue;
          }

          if (ancestors[s.bid]) {
            if (!node.spbacks) {
              node.spbacks = new BlockSet();
            }
            node.spbacks.set(s.bid);
          }
          !visited[s.bid] && worklist.push(s);
        }
      }

      this.blocks = blocks.reverse();
    }