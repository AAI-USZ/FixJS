function (block) {
        if (DEBUG_WIRE) { console.group("root " + block + ":" + getBehavior(block).name); }
        if (getBehavior(block) === Circuit.behaviors.junction) {
          // do not trace from junctions (not implemented yet)
          if (DEBUG_WIRE) { console.groupEnd(); }
          return;
        }
        traceIntoNode(null, block, null);
        if (DEBUG_WIRE) { console.groupEnd(); }
      }