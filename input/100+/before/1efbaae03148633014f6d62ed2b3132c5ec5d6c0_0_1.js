function(fun) {
    // Replace all var definitions with assignments; we will add var definitions at the top after we registerize
    // We also mark local variables - i.e., having a var definition
    var localVars = {};
    var hasSwitch = false; // we cannot optimize variables if there is a switch
    traverse(fun, function(node, type) {
      if (type == 'var') {
        node[1].forEach(function(defined) { localVars[defined[0]] = 1 });
        var vars = node[1].filter(function(varr) { return varr[1] });
        if (vars.length > 1) {
          var ret = ['stat', []];
          var curr = ret[1];
          for (var i = 0; i < vars.length-1; i++) {
            curr[0] = 'seq';
            curr[1] = ['assign', true, ['name', vars[i][0]], vars[i][1]];
            if (i != vars.length-2) curr = curr[2] = [];
          }
          curr[2] = ['assign', true, ['name', vars[vars.length-1][0]], vars[vars.length-1][1]];
          return ret;
        } else if (vars.length == 1) {
          return ['stat', ['assign', true, ['name', vars[0][0]], vars[0][1]]];
        } else {
          return emptyNode();
        }
      } else if (type == 'switch') {
        hasSwitch = true;
      }
    });
    vacuum(fun);
    // Find the # of uses of each variable.
    // While doing so, check if all a variable's uses are dominated in a simple
    // way by a simple assign, if so, then we can assign its register to it
    // just for its definition to its last use, and not to the entire toplevel loop,
    // we call such variables "optimizable"
    var varUses = {};
    var level = 1;
    var levelDominations = {};
    var varLevels = {};
    var possibles = {};
    var unoptimizables = {};
    traverse(fun, function(node, type) {
      if (type == 'name') {
        var name = node[1];
        if (localVars[name]) {
          if (!varUses[name]) varUses[name] = 0;
          varUses[name]++;
          if (possibles[name] && !varLevels[name]) unoptimizables[name] = 1; // used outside of simple domination
        }
      } else if (type == 'assign' && typeof node[1] != 'string') {
        if (node[2] && node[2][0] == 'name') {
          var name = node[2][1];
          // if local and not yet used, this might be optimizable if we dominate
          // all other uses
          if (localVars[name] && !varUses[name] && !varLevels[name]) {
            possibles[name] = 1;
            varLevels[name] = level;
            if (!levelDominations[level]) levelDominations[level] = {};
            levelDominations[level][name] = 1;
          }
        }
      } else if (type in CONTROL_FLOW) {
        level++;
      }
    }, function(node, type) {
      if (type in CONTROL_FLOW) {
        // Invalidate all dominating on this level, further users make it unoptimizable
        for (var name in levelDominations[level]) {
          varLevels[name] = 0;
        }
        levelDominations[level] = null;
        level--;
      }
    });
    var optimizables = {};
    if (!hasSwitch) {
      for (var possible in possibles) {
        if (!unoptimizables[possible]) optimizables[possible] = 1;
      }
    }
    // Go through the function's code, assigning 'registers'.
    // The only tricky bit is to keep variables locked on a register through loops,
    // since they can potentially be returned to. Optimizable variables lock onto
    // loops that they enter, unoptimizable variables lock in a conservative way
    // into the topmost loop.
    // Note that we cannot lock onto a variable in a loop if it was used and free'd
    // before! (then they could overwrite us in the early part of the loop). For now
    // we just use a fresh register to make sure we avoid this, but it could be
    // optimized to check for safe registers (free, and not used in this loop level).
    var varRegs = {}; // maps variables to the register they will use all their life
    var freeRegs = [];
    var nextReg = 1;
    var fullNames = {};
    var loopRegs = {}; // for each loop nesting level, the list of bound variables
    var loops = 0; // 0 is toplevel, 1 is first loop, etc
    var saved = 0;
    var activeOptimizables = {};
    var optimizableLoops = {};
    function decUse(name) {
      if (!varUses[name]) return false; // no uses left, or not a relevant variable
      if (optimizables[name]) activeOptimizables[name] = 1;
      var reg = varRegs[name];
      if (!reg) {
        // acquire register
        if (optimizables[name] && freeRegs.length > 0) {
          reg = freeRegs.pop();
          saved++;
        } else {
          reg = nextReg++;
          fullNames[reg] = 'r' + reg; // TODO: even smaller names
        }
        varRegs[name] = reg;
      }
      varUses[name]--;
      assert(varUses[name] >= 0);
      if (varUses[name] == 0) {
        if (optimizables[name]) delete activeOptimizables[name];
        // If we are not in a loop, or we are optimizable and not bound to a loop
        // (we might have been in one but left it), we can free the register now.
        if (loops == 0 || (optimizables[name] && !optimizableLoops[name])) {
          // free register
          freeRegs.push(reg);
        } else {
          // when the relevant loop is exited, we will free the register
          var releventLoop = optimizables[name] ? (optimizableLoops[name] || 1) : 1;
          if (!loopRegs[releventLoop]) loopRegs[releventLoop] = [];
          loopRegs[releventLoop].push(reg);
        }
      }
      return true;
    }
    traverse(fun, function(node, type) { // XXX we rely on traversal order being the same as execution order here
      if (type == 'name') {
        var name = node[1];
        if (decUse(name)) {
          node[1] = fullNames[varRegs[name]];
        }
      } else if (type in LOOP) {
        loops++;
        // Active optimizables lock onto this loop, if not locked onto one that encloses this one
        for (var name in activeOptimizables) {
          if (!optimizableLoops[name]) {
            optimizableLoops[name] = loops;
          }
        }
      }
    }, function(node, type) {
      if (type in LOOP) {
        // Free registers that were locked to this loop
        if (loopRegs[loops]) {
          freeRegs = freeRegs.concat(loopRegs[loops]);
          loopRegs[loops] = [];
        }
        loops--;
      }
    });
    // Add vars at the beginning
    if (nextReg > 1) {
      var vars = [];
      for (var i = 1; i < nextReg; i++) {
        vars.push([fullNames[i]]);
      }
      getStatements(fun).unshift(['var', vars]);
    }
    printErr(fun[1] + ': saved ' + saved + ' / ' + (saved + nextReg - 1) + ' vars through registerization'); // not totally accurate
  }