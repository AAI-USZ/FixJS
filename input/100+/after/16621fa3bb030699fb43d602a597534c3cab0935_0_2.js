function (direction) {
          if (String(direction) === String(comingFrom)) {
            if (circuitDebug) console.log("∆" + direction + " is reverse");
            // don't look backward
            return;
          }
          
          var beh = getBehavior(block);
          
          // non-junctions get separate nets, junctions extend nets
          var existingNet = cGraph[block][direction];
          if (beh === Circuit.behaviors.junction) {
            if (existingNet && existingNet !== net) {
              if (circuitDebug) console.log(block + "∆" + direction + " met net " + existingNet + " to merge");
              netsToMerge.push([net, existingNet]);
              return;
            }
          } else {
            if (existingNet) {
              if (circuitDebug) console.log(block + "∆" + direction + " is already traced");
              // already traced
              return;
            }
            
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
        }