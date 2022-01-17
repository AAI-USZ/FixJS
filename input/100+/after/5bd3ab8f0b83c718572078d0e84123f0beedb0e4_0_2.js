function compileBlock(block, state) {
    var writer = this.compiler.writer;

    if (traceLevel.value <= 2) {
      writer = null;
    }

    if (writer) {
      writer.enter("block " + block.blockId + ", dom: " + block.dominator.blockId + " [" + block.position + "-" + block.end.position + "] {");
      writer.enter("entryState {");
      state.trace(writer);
      writer.leave("}");
    }

    var statements = [];

    var local = this.local;
    var temporary = this.temporary;
    var varPool = this.variablePool;

    function getSlot(obj, index) {
      pushValue(obj + "[" + obj + ".slots[" + index + "]]");
    }

    function setSlot(obj, index, value) {
      flushStack();
      var temp = varPool.acquire();
      statements.push(temp + " = " + obj + ".types[" + index + "];");
      statements.push(obj + "[" + obj + ".slots[" + index + "]] = " +
                      temp + " ? " + temp + ".call" + argumentList(temp, value) +
                      " : " + value + ";");
      varPool.release(temp);
    }

    if (enableCSE.value) {
      if (block.dominator === block) {
        block.cse = new CSE(null, this.variablePool);
      } else {
        assert (block.dominator.cse, "Dominator should have a CSE map.");
        block.cse = new CSE(block.dominator.cse, this.variablePool);
      }
    }

    function expression(operator) {
      if (operator.isBinary()) {
        var b = state.stack.pop();
        var a = state.stack.pop();
        pushValue(new Expression(a, operator, b));
      } else {
        var a = state.stack.pop();
        pushValue(new Expression(a, operator));
      }
    }

    function pushValue(value) {
      if (typeof value === "string") {
        value = new Literal(value);
      }
      if (enableCSE.value &&
          (value instanceof FindProperty || value instanceof GetGlobalScope)) {
        cseValue(value);
      } else {
        state.stack.push(value);
      }
    }

    function setLocal(index) {
      var value = state.stack.pop();
      flushStack();
      emitStatement(local[index] + " = " + value);
    }

    function duplicate(value) {
      var temp = varPool.acquire();
      state.stack.push("(" + temp + " = " + value + ")");
      state.stack.push(temp);
      varPool.release(temp);
    }

    function popValue() {
      emitStatement(state.stack.pop());
    }

    function kill(index) {
      flushStack();
      emitStatement(local[index] + " = " + new Constant(undefined));
    }

    /**
     * Stores all stack values into temporaries. At the end of a block, the state stack
     * may not be empty. This usually occurs for short-circuited conditional expressions.
     */
    function flushStack() {
      // assert (state.stack.length <= 2, "Stack Length is " + state.stack.length);
      for (var i = 0; i < state.stack.length; i++) {
        if (state.stack[i] !== temporary[i]) {
          emitStatement(temporary[i] + " = " + state.stack[i]);
          state.stack[i] = temporary[i];
        }
      }
    }

    var condition = null;

    /**
     * Remembers the branch condition for this block, which is passed and used by the If control
     * node.
     */
    function setCondition(operator) {
      assert (condition === null);
      var b = undefined;
      if (operator.isBinary()) {
        b = state.stack.pop();
      }
      var a = state.stack.pop();
      condition = new Expression(a, operator, b);
    }

    function setNegatedCondition(operator) {
      setCondition(operator);
      condition = new Expression(condition, Operator.FALSE);
    }

    function emitStatement(statement) {
      statements.push(statement + ";");
    }

    function emitAssignment(variable, expression) {
      statements.push(variable + " = " + expression + ";");
    }

    function emitComment(comment) {
      statements.push("/* " + comment + " */");
    }

    function cseValue(value) {
      assert (value);
      if (block.cse) {
        var otherValue = block.cse.get(value, true);
        if (otherValue === value) {
          emitAssignment(value.variable, value);
        }
        state.stack.push(otherValue.variable);
      }
    }

    var abc = this.compiler.abc;
    var ints = abc.constantPool.ints;
    var uints = abc.constantPool.uints;
    var doubles = abc.constantPool.doubles;
    var strings = abc.constantPool.strings;
    var methods = abc.methods;
    var multinames = abc.constantPool.multinames;
    var runtime = abc.runtime;
    var savedScope = this.savedScope;
    var multiname, args, value, obj, ns, name, type, factory, index, temp;

    function classObject() {
      return SAVED_SCOPE_NAME + ".object";
    }

    function superClassInstanceObject() {
      return classObject() + ".baseClass.instance";
    }

    function superOf(obj) {
      return obj + ".public$constructor.baseClass.instance.prototype";
    }

    /**
     * Find the scope object containing the specified multiname.
     */
    function findProperty(multiname, strict) {
      if (false && !multiname.isQName()) {
        if (savedScope) {
          var resolved = savedScope.resolveMultiname(multiname);
          if (resolved) {
            return new FindProperty(resolved, strict);
          }
        }
      }
      return new FindProperty(multiname, strict);
    }

    function getProperty(obj, multiname) {
      if (obj instanceof FindProperty &&
          obj.multiname.name === multiname.name &&
          obj.multiname.isQName()) {
        return obj + "." + obj.multiname.getQualifiedName();
      }

      /**
       * Looping over arrays by index will use a MultinameL
       * as it's the simplest type of late name. Instead of
       * doing a runtime looking, quickly go through late
       * name lookup here.
       */
      if (multiname.isRuntimeName() && multiname.isPublicNamespaced()) {
        var value = state.stack.pop();
        return obj + "." + GET_ACCESSOR + "(" + value + ")";
      }

      return "getProperty" + argumentList(obj, objectConstant(multiname));
    }

    function toInt32() {
      pushValue(new Constant(0));
      expression(Operator.OR);
    }

    var bytecodes = this.method.analysis.bytecodes;
    for (var bci = block.position, end = block.end.position; bci <= end; bci++) {
      var bc = bytecodes[bci];
      var op = bc.op;

      if (writer) {
        writer.enter("bytecode bci: " + bci + ", originalBci: " + bc.originalPosition +", " + bc +  " {");
      }

      switch (op) {
      case OP_bkpt:           notImplemented(); break;
      case OP_throw:
        temp = varPool.acquire();
        emitStatement(temp + " = " +
                      objectConstant(abc) + ".runtime.exception");
        emitStatement(temp + ".value = " + state.stack.pop());
        emitStatement("throw " + temp);
        varPool.release(temp);
        break;
      case OP_getsuper:       notImplemented(); break;
      case OP_setsuper:       notImplemented(); break;
      case OP_dxns:           notImplemented(); break;
      case OP_dxnslate:       notImplemented(); break;
      case OP_kill:           kill(bc.index); break;
      case OP_lf32x4:         notImplemented(); break;
      case OP_sf32x4:         notImplemented(); break;
      case OP_ifnlt:          setNegatedCondition(Operator.LT); break;
      case OP_ifge:           setCondition(Operator.GE); break;
      case OP_ifnle:          setNegatedCondition(Operator.LE); break;
      case OP_ifgt:           setCondition(Operator.GT); break;
      case OP_ifngt:          setNegatedCondition(Operator.GT); break;
      case OP_ifle:           setCondition(Operator.LE); break;
      case OP_ifnge:          setNegatedCondition(Operator.GE); break;
      case OP_iflt:           setCondition(Operator.LT); break;
      case OP_jump:
        // NOP
        break;
      case OP_iftrue:
        setCondition(Operator.TRUE);
        break;
      case OP_iffalse:
        setCondition(Operator.FALSE);
        break;
      case OP_ifeq:           setCondition(Operator.EQ); break;
      case OP_ifne:           setCondition(Operator.NE); break;
      case OP_ifstricteq:     setCondition(Operator.SEQ); break;
      case OP_ifstrictne:     setCondition(Operator.SNE); break;
      case OP_lookupswitch:
        // notImplemented();
        break;
      case OP_pushwith:
        flushStack();
        obj = state.stack.pop();
        emitStatement(SCOPE_NAME + " = new Scope" + argumentList(SCOPE_NAME, obj));
        state.scopeHeight += 1;
        break;
      case OP_popscope:
        flushStack();
        emitStatement(SCOPE_NAME + " = " + SCOPE_NAME + ".parent");
        state.scopeHeight -= 1;
        break;
      case OP_nextname:
        index = state.stack.pop();
        obj = state.stack.pop();
        pushValue("nextName" + argumentList(obj, index));
        break;
      case OP_hasnext:
        // TODO: Temporary implementation, totally broken.
        pushValue(new Constant(false));
        break;
      case OP_hasnext2:
        flushStack();
        obj = local[bc.object];
        index = local[bc.index];
        temp = varPool.acquire();
        emitStatement( + " = hasNext2" + argumentList(obj, index));
        emitStatement(local[bc.object] + " = " + temp + ".object");
        emitStatement(local[bc.index] + " = " + temp + ".index");
        pushValue(temp + ".index");
        varPool.release(temp);
        break;
      case OP_pushnull:       pushValue(new Constant(null)); break;
      case OP_pushundefined:  pushValue(new Constant(undefined)); break;
      case OP_pushfloat:      notImplemented(); break;
      case OP_nextvalue:      notImplemented(); break;
      case OP_pushbyte:       pushValue(new Constant(bc.value)); break;
      case OP_pushshort:      pushValue(new Constant(bc.value)); break;
      case OP_pushstring:     pushValue(new Constant(strings[bc.index])); break;
      case OP_pushint:        pushValue(new Constant(ints[bc.index])); break;
      case OP_pushuint:       pushValue(new Constant(uints[bc.index])); break;
      case OP_pushdouble:     pushValue(new Constant(doubles[bc.index])); break;
      case OP_pushtrue:       pushValue(new Constant(true)); break;
      case OP_pushfalse:      pushValue(new Constant(false)); break;
      case OP_pushnan:        pushValue(new Constant(NaN)); break;
      case OP_pop:            popValue(); break;
      case OP_dup:            duplicate(state.stack.pop()); break;
      case OP_swap:           state.stack.push(state.stack.pop(), state.stack.pop()); break;
      case OP_pushscope:
        flushStack();
        obj = state.stack.pop();
        emitStatement(SCOPE_NAME + " = new Scope" + argumentList(SCOPE_NAME, obj));
        state.scopeHeight += 1;
        break;
      case OP_pushnamespace:  notImplemented(); break;
      case OP_li8:            notImplemented(); break;
      case OP_li16:           notImplemented(); break;
      case OP_li32:           notImplemented(); break;
      case OP_lf32:           notImplemented(); break;
      case OP_lf64:           notImplemented(); break;
      case OP_si8:            notImplemented(); break;
      case OP_si16:           notImplemented(); break;
      case OP_si32:           notImplemented(); break;
      case OP_sf32:           notImplemented(); break;
      case OP_sf64:           notImplemented(); break;
      case OP_newfunction:
        pushValue(objectConstant(abc) + ".runtime.createFunction" + argumentList(objectConstant(methods[bc.index]), SCOPE_NAME));
        break;
      case OP_call:
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        pushValue(state.stack.pop() + argumentList.apply(null, args));
        break;
      case OP_construct:
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        pushValue("new (" + obj + ".instance)" + argumentList.apply(null, args));
        break;
      case OP_callmethod:     notImplemented(); break;
      case OP_callstatic:     notImplemented(); break;
      case OP_callsuper:
        flushStack();
        multiname = multinames[bc.index];
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        pushValue(getProperty(superOf(obj), multiname) + ".call" + argumentList.apply(null, [obj].concat(args)));
        break;
      case OP_callproperty:
        flushStack();
        multiname = multinames[bc.index];
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        pushValue(getProperty(obj, multiname) + ".call" + argumentList.apply(null, [obj].concat(args)));
        break;
      case OP_returnvoid:     emitStatement("return"); break;
      case OP_returnvalue:    emitStatement("return " + state.stack.pop()); break;
      case OP_constructsuper:
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        emitStatement(superClassInstanceObject() + ".call" + argumentList.apply(null, [obj].concat(args)));
        break;
      case OP_constructprop:
        multiname = multinames[bc.index];
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        pushValue("new (" + getProperty(obj, multiname) + ".instance)" + argumentList.apply(null, args));
        break;
      case OP_callsuperid:    notImplemented(); break;
      case OP_callproplex:
        multiname = multinames[bc.index];
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        pushValue(getProperty(obj, multiname) + ".call" + argumentList.apply(null, [obj].concat(args)));
        break;
      case OP_callinterface:  notImplemented(); break;
      case OP_callsupervoid:
        flushStack();
        multiname = multinames[bc.index];
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        emitStatement(getProperty(superOf(obj), multiname) + ".call" + argumentList.apply(null, [obj].concat(args)));
        break;
      case OP_callpropvoid:
        multiname = multinames[bc.index];
        args = state.stack.popMany(bc.argCount);
        obj = state.stack.pop();
        assert(!multiname.isRuntime());
        emitStatement(getProperty(obj, multiname) + ".call" + argumentList.apply(null, [obj].concat(args)));
        break;
      case OP_sxi1:           notImplemented(); break;
      case OP_sxi8:           notImplemented(); break;
      case OP_sxi16:          notImplemented(); break;
      case OP_applytype:
        args = state.stack.popMany(bc.argCount);
        factory = state.stack.pop();
        pushValue("applyType" + argumentList(factory, args));
        flushStack();
        break;
      case OP_pushfloat4:     notImplemented(); break;
      case OP_newobject:
        var nameValuePairs = [];
        for (var i = 0; i < bc.argCount; i++) {
          var pair = state.stack.popMany(2);
          nameValuePairs.push(pair[0] + ": " + pair[1]);
        }
        pushValue("{" + nameValuePairs.join(", ") + "}");
        break;
      case OP_newarray:       pushValue("[" + state.stack.popMany(bc.argCount) + "]"); break;
      case OP_newactivation:
        assert (this.method.needsActivation());
        emitStatement("var activation = " + objectConstant(abc) + ".runtime.createActivation" + argumentList(objectConstant(this.method)));
        pushValue("activation");
        break;
      case OP_newclass:
        pushValue(objectConstant(abc) + ".runtime.createClass" + argumentList(objectConstant(abc.classes[bc.index]), state.stack.pop(), SCOPE_NAME));
        break;
      case OP_getdescendants: notImplemented(); break;
      case OP_newcatch:       notImplemented(); break;
      case OP_findpropstrict:
        multiname = multinames[bc.index];
        assertNotImplemented (!multiname.isRuntime());
        pushValue(findProperty(multiname, true));
        break;
      case OP_findproperty:
        multiname = multinames[bc.index];
        assertNotImplemented (!multiname.isRuntime());
        pushValue(findProperty(multiname, false));
        break;
      case OP_finddef:        notImplemented(); break;
      case OP_getlex:
        multiname = multinames[bc.index];
        assert (!multiname.isRuntime());
        pushValue(getProperty(findProperty(multiname, true), multiname));
        break;
      case OP_setproperty:
        value = state.stack.pop();
        multiname = multinames[bc.index];
        flushStack();
        if (!multiname.isRuntime()) {
          obj = state.stack.pop();
          emitStatement("setProperty" + argumentList(obj, objectConstant(multiname), value));
        } else {
          ns = name = null;
          if (multiname.isRuntimeName()) {
            name = state.stack.pop();
          }
          if (multiname.isRuntimeNamespace()) {
            ns = state.stack.pop();
          }
          obj = state.stack.pop();
          emitStatement(obj + "." + SET_ACCESSOR + "(" + name + ", " + value + ")");
        }
        break;
      case OP_getlocal:       pushValue(local[bc.index]); break;
      case OP_setlocal:       setLocal(bc.index); break;
      case OP_getglobalscope:
        pushValue(new GetGlobalScope());
        break;
      case OP_getscopeobject:
        obj = SCOPE_NAME;
        for (var i = 0; i < (state.scopeHeight - 1) - bc.index; i++) {
          obj += ".parent";
        }
        pushValue(obj + ".object");
        break;
      case OP_getproperty:
        multiname = multinames[bc.index];
        if (!multiname.isRuntime()) {
          obj = state.stack.pop();
          pushValue(getProperty(obj, multiname));
        } else {
          ns = name = null;
          if (multiname.isRuntimeName()) {
            name = state.stack.pop();
          }
          if (multiname.isRuntimeNamespace()) {
            ns = state.stack.pop();
          }
          obj = state.stack.pop();
          pushValue(new GetPropertyRuntime(obj, ns, name));
        }
        break;
      case OP_getouterscope:      notImplemented(); break;
      case OP_initproperty:
        value = state.stack.pop();
        multiname = multinames[bc.index];
        if (!multiname.isRuntime()) {
          obj = state.stack.pop();
          emitStatement("setProperty" + argumentList(obj, objectConstant(multiname), value));
        } else {
          notImplemented();
        }
        break;
      case OP_setpropertylate:    notImplemented(); break;
      case OP_deleteproperty:
        multiname = multinames[bc.index];
        if (!multiname.isRuntime()) {
          obj = state.stack.pop();
          pushValue("deleteProperty" + argumentList(obj, objectConstant(multiname)));
          flushStack();
        } else {
          notImplemented();
        }
        break;
      case OP_deletepropertylate: notImplemented(); break;
      case OP_getslot:            getSlot(state.stack.pop(), bc.index); break;
      case OP_setslot:
        value = state.stack.pop();
        obj = state.stack.pop();
        setSlot(obj, bc.index, value);
        break;
      case OP_getglobalslot:  notImplemented(); break;
      case OP_setglobalslot:  notImplemented(); break;
      case OP_convert_s:      pushValue("toString" + argumentList(state.stack.pop())); break;
      case OP_esc_xelem:      notImplemented(); break;
      case OP_esc_xattr:      notImplemented(); break;
      case OP_coerce_i:
      case OP_convert_i:
        pushValue("toInt" + argumentList(state.stack.pop()));
        break;
      case OP_coerce_u:
      case OP_convert_u:
        pushValue("toUint" + argumentList(state.stack.pop()));
        break;
      case OP_coerce_d:
      case OP_convert_d:
        pushValue("toDouble" + argumentList(state.stack.pop()));
        break;
      case OP_coerce_b:
      case OP_convert_b:
        pushValue("toBoolean" + argumentList(state.stack.pop()));
        break;
      case OP_convert_o:      notImplemented(); break;
      case OP_checkfilter:    notImplemented(); break;
      case OP_convert_f:      notImplemented(); break;
      case OP_unplus:         notImplemented(); break;
      case OP_convert_f4:     notImplemented(); break;
      case OP_coerce:
        value = state.stack.pop();
        multiname = multinames[bc.index];
        type = getProperty(findProperty(multiname, true), multiname);
        pushValue("coerce" + argumentList(value, type));
      case OP_coerce_a:       /* NOP */ break;
      case OP_coerce_s:       pushValue("coerceString" + argumentList(state.stack.pop())); break;
      case OP_astype:         notImplemented(); break;
      case OP_astypelate:     notImplemented(); break;
      case OP_coerce_o:
        obj = state.stack.pop();
        pushValue("(" + obj + " == undefined ? null : " + obj + ")");
        break;
      case OP_negate:         expression(Operator.NEG); break;
      case OP_increment:
        pushValue(new Constant(1));
        expression(Operator.ADD);
        break;
      case OP_inclocal:
        emitStatement("++" + local[bc.index]);
        break;
      case OP_decrement:
        pushValue(new Constant(1));
        expression(Operator.SUB);
        break;
      case OP_declocal:
        emitStatement("--" + local[bc.index]);
        break;
      case OP_typeof:
        pushValue("typeOf" + argumentList(state.stack.pop()));
        break;
      case OP_not:            expression(Operator.FALSE); break;
      case OP_bitnot:         expression(Operator.BITWISE_NOT); break;
      case OP_add_d:          notImplemented(); break;
      case OP_add:            expression(Operator.ADD); break;
      case OP_subtract:       expression(Operator.SUB); break;
      case OP_multiply:       expression(Operator.MUL); break;
      case OP_divide:         expression(Operator.DIV); break;
      case OP_modulo:         expression(Operator.MOD); break;
      case OP_lshift:         expression(Operator.LSH); break;
      case OP_rshift:         expression(Operator.RSH); break;
      case OP_urshift:        expression(Operator.URSH); break;
      case OP_bitand:         expression(Operator.AND); break;
      case OP_bitor:          expression(Operator.OR); break;
      case OP_bitxor:         expression(Operator.XOR); break;
      case OP_equals:         expression(Operator.EQ); break;
      case OP_strictequals:   expression(Operator.SEQ); break;
      case OP_lessthan:       expression(Operator.LT); break;
      case OP_lessequals:     expression(Operator.LE); break;
      case OP_greaterthan:    expression(Operator.GT); break;
      case OP_greaterequals:  expression(Operator.GE); break;
      case OP_instanceof:
        // TODO: Temporary implementation, totally broken.
        state.stack.pop();
        state.stack.pop();
        pushValue(new Constant(true));
        break;
      case OP_istype:
        value = state.stack.pop();
        multiname = multinames[bc.index];
        assert (!multiname.isRuntime());
        type = getProperty(findProperty(multiname, true), multiname);
        pushValue(type + " instanceof Class ? " + type + ".isInstance" + argumentList(value) + " : false");
        break;
      case OP_istypelate:
        type = state.stack.pop();
        value = state.stack.pop();
        pushValue(type + " instanceof Class ? " + type + ".isInstance" + argumentList(value) + " : false");
        break;
      case OP_in:             notImplemented(); break;
      case OP_increment_i:
        toInt32();
        pushValue(new Constant(1));
        expression(Operator.ADD);
        break;
      case OP_decrement_i:
        toInt32();
        pushValue(new Constant(1));
        expression(Operator.SUB);
        break;
      case OP_inclocal_i:
        emitStatement(locals[bc.index] + " = (" + locals[bc.index] + " | 0) + 1");
        break;
      case OP_declocal_i:
        emitStatement(locals[bc.index] + " = (" + locals[bc.index] + " | 0) - 1");
        break;
      case OP_negate_i:
        toInt32();
        expression(Operator.NEG);
        break;
      case OP_add_i:
        value = stack.state.pop();
        toInt32();
        stack.state.push(value);
        toInt32();
        expression(Operator.ADD);
        break;
      case OP_subtract_i:
        value = stack.state.pop();
        toInt32();
        stack.state.push(value);
        toInt32();
        expression(Operator.SUB);
        break;
      case OP_multiply_i:
        value = stack.state.pop();
        toInt32();
        stack.state.push(value);
        toInt32();
        expression(Operator.MUL);
        break;
      case OP_getlocal0:
      case OP_getlocal1:
      case OP_getlocal2:
      case OP_getlocal3:
        pushValue(local[op - OP_getlocal0]);
        break;
      case OP_setlocal0:
      case OP_setlocal1:
      case OP_setlocal2:
      case OP_setlocal3:
        setLocal(op - OP_setlocal0);
        break;
      case OP_debug:
        /* NOP */
        break;
      case OP_debugline:
        emitComment("line: " + bc.lineNumber);
        break;
      case OP_debugfile:
        emitComment("file: " + strings[bc.index]);
        break;
      case OP_bkptline:       notImplemented(); break;
      case OP_timestamp:      notImplemented(); break;
      default:
        console.info("Not Implemented: " + opcodeName(bc));
      }

      if (writer) {
        state.trace(writer);
        writer.enter("statements:");
        if (statements.length > 10) {
          writer.writeArray(statements.slice(statements.length - 10));
        } else {
          writer.writeArray(statements);
        }
        writer.outdent();
        writer.leave("}");
      }
    }

    if (writer) {
      writer.leave("}");
    }

    flushStack();

    return {state: state, condition: condition, statements: statements};
  }