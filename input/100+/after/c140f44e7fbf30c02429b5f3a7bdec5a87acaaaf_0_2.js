function traceIntoNode(net, block, comingFrom) {
        if (DEBUG_WIRE) console.group("traceIntoNode " + net + " " + block + ":" + getBehavior(block).name + " " + comingFrom);
        DIRECTIONS.forEach(function (direction) {
          if (String(direction) === String(comingFrom)) {
            // don't look backward
            return;
          }
          
          if (cGraph[block][direction]) {
            // already traced
            return;
          }
          
          var beh = getBehavior(block);
          
          // non-junctions get separate nets, junctions extend nets
          if (beh !== Circuit.behaviors.junction) {
            net = [];
            net.edges = [];
            net.serial = netSerial++;
            net.toString = function () { return "net" + this.serial; };
            nets.push(net);
          }
          
          cGraph[block][direction] = net;
          net.push([block,direction]);
          net["has" + beh.getFace(world, block, direction)] = true;
          traceNet(net, block, direction);
        });
        if (DEBUG_WIRE) { console.groupEnd(); }
      }