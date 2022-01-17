function detectBasicBlocks() {
      var bytecodes = this.bytecodes;
      var blockById = {};
      var code;
      var pc, end;
      var id = 0;

      id = bytecodes[0].makeBlockHead(id);
      for (pc = 0, end = bytecodes.length - 1; pc < end; pc++) {
        code = bytecodes[pc];
        switch (code.op) {
        case OP_returnvoid:
        case OP_returnvalue:
        case OP_throw:
          id = bytecodes[pc + 1].makeBlockHead(id);
          break;

        case OP_lookupswitch:
          var targets = code.targets;
          for (var i = 0, j = targets.length; i < j; i++) {
            id = targets[i].makeBlockHead(id);
          }
          id = bytecodes[pc + 1].makeBlockHead(id);
          break;

        case OP_jump:
        case OP_iflt:
        case OP_ifnlt:
        case OP_ifle:
        case OP_ifnle:
        case OP_ifgt:
        case OP_ifngt:
        case OP_ifge:
        case OP_ifnge:
        case OP_ifeq:
        case OP_ifne:
        case OP_ifstricteq:
        case OP_ifstrictne:
        case OP_iftrue:
        case OP_iffalse:
          id = code.target.makeBlockHead(id);
          id = bytecodes[pc + 1].makeBlockHead(id);
          break;

        default:;
        }
      }

      code = bytecodes[end];
      switch (code.op) {
      case OP_returnvoid:
      case OP_returnvalue:
      case OP_throw:
        break;

      case OP_lookupswitch:
        var targets = code.targets;
        for (var i = 0, j = targets.length; i < j; i++) {
          id = targets[i].makeBlockHead(id);
        }
        break;

      case OP_jump:
        id = code.target.makeBlockHead(id);
        break;

      case OP_iflt:
      case OP_ifnlt:
      case OP_ifle:
      case OP_ifnle:
      case OP_ifgt:
      case OP_ifngt:
      case OP_ifge:
      case OP_ifnge:
      case OP_ifeq:
      case OP_ifne:
      case OP_ifstricteq:
      case OP_ifstrictne:
      case OP_iftrue:
      case OP_iffalse:
        id = code.target.makeBlockHead(id);
        bytecodes[pc + 1] = getInvalidTarget(null, pc + 1);
        id = bytecodes[pc + 1].makeBlockHead(id);
        break;

      default:;
      }

      var currentBlock = bytecodes[0];
      for (pc = 1, end = bytecodes.length; pc < end; pc++) {
        if (!bytecodes[pc].succs) {
          continue;
        }

        assert(currentBlock.succs);

        blockById[currentBlock.bid] = currentBlock;
        code = bytecodes[pc - 1];
        currentBlock.end = code;
        var nextBlock = bytecodes[pc];

        switch (code.op) {
        case OP_returnvoid:
        case OP_returnvalue:
        case OP_throw:
          break;

        case OP_lookupswitch:
          for (var i = 0, j = code.targets.length; i < j; i++) {
            currentBlock.succs.push(code.targets[i]);
          }
          break;

        case OP_jump:
          currentBlock.succs.push(code.target);
          break;

        case OP_iflt:
        case OP_ifnlt:
        case OP_ifle:
        case OP_ifnle:
        case OP_ifgt:
        case OP_ifngt:
        case OP_ifge:
        case OP_ifnge:
        case OP_ifeq:
        case OP_ifne:
        case OP_ifstricteq:
        case OP_ifstrictne:
        case OP_iftrue:
        case OP_iffalse:
          currentBlock.succs.push(code.target);
          if (code.target !== nextBlock) {
            currentBlock.succs.push(nextBlock);
          }
          break;

        default:
          currentBlock.succs.push(nextBlock);
        }

        currentBlock = nextBlock;
      }
      blockById[currentBlock.bid] = currentBlock;

      code = bytecodes[end - 1];
      switch (code.op) {
      case OP_lookupswitch:
        for (var i = 0, j = code.targets.length; i < j; i++) {
          currentBlock.succs.push(code.targets[i]);
        }
        break;

      case OP_jump:
        currentBlock.succs.push(code.target);
        break;

      default:;
      }
      currentBlock.end = code;

      this.BlockSet = blockSetClass(id, blockById);
    }