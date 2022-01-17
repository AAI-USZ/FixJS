function traceNet(net, block, direction) {
        try {
          if (circuitDebug) console.group("traceNet " + net + " " + block + ":" + getBehavior(block).name + " : " + direction);
          direction = Array.prototype.slice.call(direction);
          var bn = block.slice();
          vec3.add(bn, direction, bn);
          for (;; vec3.add(bn, direction, bn)) {
            if (circuitDebug) console.log("walk " + bn);
            var bnBeh = getBehavior(bn);
            var comingFrom = vec3.negate(direction, []);
            if (!bnBeh) {
              return; // not a circuit element
            } else if (bnBeh === Circuit.behaviors.wire) {
              continue; // pass-through
            } else if (cGraph[bn][comingFrom] && cGraph[bn][comingFrom] !== net) {
              throw new Error("met different net!");
            } else if (cGraph[bn][comingFrom] && cGraph[bn][comingFrom] === net) {
              return; // already traced -- TODO: this case unnecessary/can'thappen?
            } else {
              // found new unclaimed node
              // Note: bn was being mutated, but we exit now so saving it is safe.
              cGraph[bn][comingFrom] = net;
              net.push([bn,comingFrom]);
              net.edges.push([net,block,bn]);
              net["has" + bnBeh.getFace(world, bn, comingFrom)] = true;
              traceIntoNode(net, bn, comingFrom);
              return;
            }
          }
        } finally { if (circuitDebug) console.groupEnd(); }
      }