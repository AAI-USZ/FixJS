function (block) {
        if (circuitDebug) { console.group("root " + block + ":" + getBehavior(block).name); }
        if (getBehavior(block) === Circuit.behaviors.junction) {
          // do not trace from junctions (not implemented yet)
          if (circuitDebug) { console.groupEnd(); }
          return;
        }
        traceIntoNode(null, block, null);
        if (circuitDebug) { console.groupEnd(); }
      }