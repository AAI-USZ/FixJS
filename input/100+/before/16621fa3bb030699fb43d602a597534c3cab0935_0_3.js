function () { // TODO should be implicit
      if (circuitDebug) {
        console.info("Recompiling circuit containing " + blocks.join(" "));
      }
      var nodes = [];
      var nets = [];
      var netSerial = 0;
      
      // Clear and initialize
      cGraph = {};
      cEdges = [];
      cNotes = {};
      
      // Find active nodes
      blocks.forEach(function (block) {
        var beh = getBehavior(block);
        if (beh && beh !== Circuit.behaviors.wire) {
          // Initialize state
          cGraph[block] = {};
          
          // Build index
          if (beh !== Circuit.behaviors.junction) {
            nodes.push(block);
          }
        }
      });
      
      // Build graph edges
      function traceNet(net, block, direction) {
        try {
          if (circuitDebug) console.group("traceNet " + net + " " + labelBlock(block) + " : " + direction);
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
      function traceIntoNode(net, block, comingFrom) {
        if (circuitDebug) console.group("traceIntoNode " + net + " " + labelBlock(block) + " from ∆" + comingFrom);
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
        if (circuitDebug) { console.groupEnd(); }
      }
      nodes.forEach(function (block) {
        if (circuitDebug) { console.group("Tracing from " + labelBlock(block)); }
        try {
          if (getBehavior(block) === Circuit.behaviors.junction) {
            // do not trace from junctions (not implemented yet)
            return;
          }
          traceIntoNode(null, block, null);
        } finally {
          if (circuitDebug) console.groupEnd();
        }
      });
      
      // Delete useless nets and record useful ones.
      // A net is useful if has both an input and an output, or if it has a junction.
      // Useless nets are either straight line o/o or i/i connections, or are when traceNet didn't find something.
      nets.forEach(function (net) {
        if (!((net.hasIN && net.hasOUT) || net.hasINOUT)) {
          net.forEach(function (record) {
            delete cGraph[record[0]][record[1]];
          });
        } else {
          cEdges = cEdges.concat(net.edges); // TODO: kludgy
        }
      });
      
      
      var evaluators = [];
      var seen = {};
      
      //var opush = evaluators.push;
      //evaluators.push = function (f) {
      //  if (player && world === player.getWorld()) {
      //    console.log("adding evaluator: " + f);
      //  }
      //  opush.call(this, f);
      //}
      
      function blockEvaluator(block, faceDirection) {
        compile(block);
        var key = block+"/"+faceDirection;
        return function (state) { return state[key]; };
      }
      
      function netEvaluator(net) {
        compileNet(net);
        var key = net.serial;
        return function (state) { return state[key]; };
      }
      
      function compileNet(net) {
        var key = net.serial;
        if (seen[key]) return;
        seen[key] = true;
        
        //console.group("compiling net " + net);
        
        var getters = [];
        net.forEach(function (record) {
          var block = record[0];
          var faceDirection = record[1];
          if (getBehavior(block).getFace(world, block, faceDirection) === OUT) {
            //console.log("doing connected output face", net.toString(), block, faceDirection);
            getters.push(blockEvaluator(block, faceDirection));
          }
        });
        function evalnet(state) {
          //if (player && world == player.getWorld()) console.log("neteval", key, state[key]);
          var flag = false;
          getters.forEach(function (f) {
            flag = flag || f(state);
          });
          state[key] = flag;
        }
        //evalnet.toString = function () { return ""+key; };
        evaluators.push(evalnet);
        
        //console.groupEnd();
      }
      
      function compile(block, caller) {
        var blockKey = String(block);
        if (seen[blockKey]) { return; }
        seen[blockKey] = true;

        //console.group("compiling block " + block);
        
        var beh = getBehavior(block);
        var inputGetters = {};
        DIRECTIONS.forEach(function (direction) {
          if (beh.getFaceUnrotated(world, block, direction) === IN) {
            var net = cGraph[block][getRot(world, block).transformVector(direction, [])];
            if (net)
              inputGetters[direction] = netEvaluator(net);
          }
        });

        var f = beh.compile(world, block, inputGetters, cNotes);
        //f.toString = function () { return ""+block; };
        evaluators.push(f);
        
        //console.groupEnd();
      }

      // We used to only compile starting from the "output" blocks. This is a nice optimization in principle, but interferes with debugging circuits since they show their connectivity but have all values undefined. Instead, we...
      // Make sure every net has its value computed
      nets.forEach(compileNet);
      // Make sure every block (outputs in particular) has had its turn (even if it has no connected nets)
      nodes.forEach(compile);
      
      evaluate = function (state) {
        if (!state) state = {};
        evaluators.forEach(function (f) { f(state); });
      };
      
      Object.freeze(cNotes);
    }