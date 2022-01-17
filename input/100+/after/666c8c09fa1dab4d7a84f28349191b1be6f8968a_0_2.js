function compileBytecode(block, state) {
      var writer = traceLevel.value <= 2 ? null : this.compiler.writer;
      if (writer) {
        writer.enter("block " + block.blockId + ", dom: " + block.dominator.blockId + " [" + block.position + "-" + block.end.position + "] {");
        writer.leave("}");
      }

      var body = [];
      var local = this.local;
      var temporary = this.temporary;

      var abc = this.compiler.abc;
      var ints = abc.constantPool.ints;
      var uints = abc.constantPool.uints;
      var doubles = abc.constantPool.doubles;
      var strings = abc.constantPool.strings;
      var methods = abc.methods;
      var multinames = abc.constantPool.multinames;
      var runtime = abc.runtime;
      var savedScope = this.savedScope;
      var multiname, args, value, obj, qn, ns, name, type, factory, index;


      function classObject() {
        return property(savedScopeName, "object");
      }

      function superClassInstanceObject() {
        return property(classObject(), "baseClass.instance");
      }

      function superOf(obj) {
        return property(obj, "public$constructor.baseClass.instance.prototype");
      }

      function runtimeProperty(propertyName) {
        var result = constant(abc.runtime);
        if (propertyName) {
          result = property(result, propertyName);
        }
        return result;
      }

      function push(value) {
        assert (typeof value !== "string");
        state.stack.push(value);
      }

      function cseValue(value) {
        if (block.cse) {
          var otherValue = block.cse.get(value, true);
          if (otherValue === value) {
            // flushStack();
            emit(assignment(value.variable, value));
            value.variable.value = value;
            // print("CSE: " + generate(value) + " -> " + value.variable);
          }
          return otherValue.variable;
        }
        return value;
      }

      function flushScope() {
        if (block.cse) {
          block.cse.reset();
        }
      }

      function setLocal(index) {
        assert (state.stack.length);
        var value = state.stack.pop();
        flushStack();
        emit(assignment(local[index], value));
      }

      function duplicate(value) {
        var temp = getTemporary(state.stack.length);
        state.stack.push(assignment(temp, value));
        state.stack.push(temp);
      }

      function popValue() {
        emit(state.stack.pop());
      }

      function kill(index) {
        flushStack();
        emit(assignment(local[index], constant(undefined)));
      }

      function getSlot(obj, index) {
        push(call(id("getSlot"), [obj, constant(index)]));
      }

      function setSlot(obj, index, value) {
        flushStack();
        emit(call(id("setSlot"), [obj, constant(index), value]));
      }

      function getTemporary(index) {
        if (index in temporary) {
          return temporary[index];
        }
        return temporary[index] = id("t" + index);
      }

      /**
       * Emits assignments that store stack expressions into temporaries.
       */
      function flushStack() {
        for (var i = 0; i < state.stack.length; i++) {
          if (state.stack[i] !== getTemporary(i)) {
            emit(assignment(getTemporary(i), state.stack[i]));
            state.stack[i] = getTemporary(i);
          }
        }
      }

      function emit(value) {
        if (!(value instanceof Statement)) {
          value = new ExpressionStatement(value);
        }
        body.push(value);
      }

      function emitComment(value) {
        // TODO
      }

      if (enableOpt.value) {
        if (block.dominator === block) {
          block.cse = new CSE(null, this.variablePool);
        } else {
          assert (block.dominator.cse, "Dominator should have a CSE map.");
          block.cse = new CSE(block.dominator.cse, this.variablePool);
        }
      }

      function expression(operator) {
        var a, b;
        if (operator.isBinary()) {
          b = state.stack.pop();
          a = state.stack.pop();
          push(new BinaryExpression(operator.name, a, b));
        } else {
          a = state.stack.pop();
          push(new UnaryExpression(operator.name, a));
        }
      }

      var condition = null;

      /**
       * Remembers the branch condition for this block, which is passed and used by the If control
       * node.
       */
      function setCondition(operator) {
        assert (condition === null);
        var b;
        if (operator.isBinary()) {
          b = state.stack.pop();
        }
        var a = state.stack.pop();
        if (b) {
          condition = new BinaryExpression(operator.name, a, b);
        } else {
          condition = new UnaryExpression(operator.name, a);
        }
      }

      function setNegatedCondition(operator) {
        setCondition(operator);
        condition = new UnaryExpression(Operator.FALSE.name, condition);
      }

      /**
       * Find the scope object containing the specified multiname.
       */
      function findProperty(multiname, strict) {
        return cseValue(new FindProperty(multiname, constant(abc.domain), strict));
      }

      function getProperty(obj, multiname) {
        assert (!(multiname instanceof Multiname), multiname);

        if (enableOpt.value && multiname instanceof RuntimeMultiname) {
          return new MemberExpression(obj, multiname.name, true);
        }

        if (multiname instanceof Constant) {
          var val = obj instanceof Variable ? obj.value : obj;
          if (val instanceof FindProperty && multiname.isEquivalent(val.multiname)) {
            if (multiname.value.isQName()) {
              return property(obj, multiname.value.getQualifiedName());
            }
          }
        }

        /**
         * Looping over arrays by index will use a MultinameL
         * as it's the simplest type of late name. Instead of
         * doing a runtime looking, quickly go through late
         * name lookup here.
         */

        /*
        if (multiname.isRuntimeName() && !multiname.isPublicNamespaced()) {
          var value = state.stack.pop();
          return call(property(obj, GET_ACCESSOR), [value]);
        }
        */

        return call(id("getProperty"), [obj, multiname]);

        /*
         if (enableAccessors.value) {
              push(call(property(obj, GET_ACCESSOR), [qn.name]));
            } else {
              push(new MemberExpression(obj, qn.name, true));
            }
         */
      }

      function setProperty(obj, multiname, value) {
        if (enableOpt.value && multiname instanceof RuntimeMultiname) {
          return assignment(new MemberExpression(obj, multiname.name, true), value);
        }
        return call(id("setProperty"), [obj, multiname, value]);
      }

      function getMultiname(index) {
        var multiname = multinames[index];
        assert (!multiname.isRuntime());
        var c = constant(multiname);
        c.multiname = multiname;
        return c;
      }

      var RuntimeMultiname = (function () {
        function runtimeMultiname(multiname, ns, name) {
          this.multiname = multiname;
          this.ns = ns;
          this.name = name;
          NewExpression.call(this, id("Multiname"), [ns, name]);
        }
        return runtimeMultiname;
      })();

      function popMultiname(index) {
        var multiname = multinames[index];
        if (multiname.isRuntime()) {
          var ns = constant(multiname.namespaces), name = constant(multiname.name);
          if (multiname.isRuntimeName()) {
            name = state.stack.pop();
          }
          if (multiname.isRuntimeNamespace()) {
            ns = state.stack.pop();
          }
          return new RuntimeMultiname(multiname, ns, name);
        } else {
          return constant(multiname);
        }
      }

      var bytecodes = this.bytecodes;
      for (var bci = block.position, end = block.end.position; bci <= end; bci++) {
        var bc = bytecodes[bci];
        var op = bc.op;

        if (writer) {
          writer.writeLn("bytecode bci: " + bci + ", originalBci: " + bc.originalPosition + ", " + bc);
        }

        switch (op) {

        case OP_bkpt:           notImplemented(); break;
        case OP_throw:
          emit(assignment(getTemporary(0), property(constant(abc), "runtime.exception")));
          emit(assignment(property(getTemporary(0), "value"), state.stack.pop()));
          emit(new ThrowStatement(getTemporary(0)));
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
          emit(assignment(scopeName, new NewExpression(id("Scope"), [scopeName, obj])));
          state.scopeHeight += 1;
          break;
        case OP_popscope:
          flushStack();
          flushScope();
          emit(assignment(scopeName, property(scopeName, "parent")));
          state.scopeHeight -= 1;
          break;
        case OP_nextname:
          index = state.stack.pop();
          obj = state.stack.pop();
          push(call(id("nextName"), [obj, index]));
          break;
        case OP_nextvalue:
          index = state.stack.pop();
          obj = state.stack.pop();
          push(call(id("nextValue"), [obj, index]));
          break;
        case OP_hasnext:
          // TODO: Temporary implementation, totally broken.
          push(constant(false));
          break;
        case OP_hasnext2:
          flushStack();
          obj = local[bc.object];
          index = local[bc.index];
          emit(assignment(getTemporary(0), call(id("hasNext2"), [obj, index])));
          emit(assignment(local[bc.object], property(getTemporary(0), "object")));
          emit(assignment(local[bc.index], property(getTemporary(0), "index")));
          push(property(getTemporary(0), "index"));
          break;
        case OP_pushnull:       push(constant(null)); break;
        case OP_pushundefined:  push(constant(undefined)); break;
        case OP_pushfloat:      notImplemented(); break;
        case OP_pushbyte:       push(constant(bc.value)); break;
        case OP_pushshort:      push(constant(bc.value)); break;
        case OP_pushstring:     push(constant(strings[bc.index])); break;
        case OP_pushint:        push(constant(ints[bc.index])); break;
        case OP_pushuint:       push(constant(uints[bc.index])); break;
        case OP_pushdouble:     push(constant(doubles[bc.index])); break;
        case OP_pushtrue:       push(constant(true)); break;
        case OP_pushfalse:      push(constant(false)); break;
        case OP_pushnan:        push(constant(NaN)); break;
        case OP_pop:            popValue(); break;
        case OP_dup:            duplicate(state.stack.pop()); break;
        case OP_swap:           state.stack.push(state.stack.pop(), state.stack.pop()); break;
        case OP_pushscope:
          flushStack();
          flushScope();
          obj = state.stack.pop();
          emit(assignment(scopeName, new NewExpression(id("Scope"), [scopeName, obj])));
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
          push(call(runtimeProperty("createFunction"), [constant(methods[bc.index]), scopeName]));
          break;
        case OP_call:
          args = state.stack.popMany(bc.argCount);
          obj = state.stack.pop();
          push(callCall(state.stack.pop(), [obj].concat(args)));
          break;
        case OP_construct:
          args = state.stack.popMany(bc.argCount);
          obj = state.stack.pop();
          push(new NewExpression(property(obj, "instance"), args));
          break;
        case OP_callmethod:     notImplemented(); break;
        case OP_callstatic:     notImplemented(); break;
        case OP_callsuper:
          flushStack();
          multiname = getMultiname(bc.index);
          args = state.stack.popMany(bc.argCount);
          obj = state.stack.pop();
          push(call(getProperty(superOf(obj), multiname), [obj].concat(args)));
          break;
        case OP_callproperty:
          flushStack();
          args = state.stack.popMany(bc.argCount);
          multiname = popMultiname(bc.index);
          obj = state.stack.pop();
          push(callCall(getProperty(obj, multiname), [obj].concat(args)));
          break;
        case OP_returnvoid:
          emit(call(property(id("Runtime"), "stack.pop"), []));
          emit(new ReturnStatement());
          break;
        case OP_returnvalue:
          emit(call(property(id("Runtime"), "stack.pop"), []));
          emit(new ReturnStatement(state.stack.pop())); break;
        case OP_constructsuper:
          args = state.stack.popMany(bc.argCount);
          obj = state.stack.pop();
          emit(callCall(superClassInstanceObject(), [obj].concat(args)));
          break;
        case OP_constructprop:
          multiname = getMultiname(bc.index);
          args = state.stack.popMany(bc.argCount);
          obj = getProperty(state.stack.pop(), multiname);
          push(new NewExpression(property(obj, "instance"), args));
          break;
        case OP_callsuperid:    notImplemented(); break;
        case OP_callproplex:
          multiname = getMultiname(bc.index);
          args = state.stack.popMany(bc.argCount);
          obj = state.stack.pop();
          push(callCall(getProperty(obj, multiname), [obj].concat(args)));
          break;
        case OP_callinterface:  notImplemented(); break;
        case OP_callsupervoid:
          flushStack();
          multiname = getMultiname(bc.index);
          args = state.stack.popMany(bc.argCount);
          obj = state.stack.pop();
          emit(callCall(getProperty(superOf(obj), multiname), [obj].concat(args)));
          break;
        case OP_callpropvoid:
          args = state.stack.popMany(bc.argCount);
          multiname = popMultiname(bc.index);
          obj = state.stack.pop();
          emit(callCall(getProperty(obj, multiname), [obj].concat(args)));
          break;
        case OP_sxi1:           notImplemented(); break;
        case OP_sxi8:           notImplemented(); break;
        case OP_sxi16:          notImplemented(); break;
        case OP_applytype:
          args = state.stack.popMany(bc.argCount);
          factory = state.stack.pop();
          push(call(runtimeProperty("applyType"), [factory].concat(new ArrayExpression(args))));
          flushStack();
          break;
        case OP_pushfloat4:     notImplemented(); break;
        case OP_newobject:
          var properties = [];
          for (var i = 0; i < bc.argCount; i++) {
            var pair = state.stack.popMany(2);
            properties.unshift(new T.Property(pair[0], pair[1], "init"));
          }
          push(new ObjectExpression(properties));
          break;
        case OP_newarray:       push(new ArrayExpression(state.stack.popMany(bc.argCount))); break;
        case OP_newactivation:
          assert (this.methodInfo.needsActivation());
          emit(new VariableDeclaration("var", [
            new VariableDeclarator(id("activation"),
                                   call(runtimeProperty("createActivation"), [constant(this.methodInfo)]))
          ]));
          push(id("activation"));
          break;
        case OP_newclass:
          push(call(property(constant(abc), "runtime.createClass"),
                    [constant(abc.classes[bc.index]), state.stack.pop(), scopeName]));
          break;
        case OP_getdescendants:
          multiname = popMultiname(bc.index);
          obj = state.stack.pop();
          push(call(id("getDescendants"), [multiname, obj]));
          break;
        case OP_newcatch:       notImplemented(); break;
        case OP_findpropstrict:
          multiname = popMultiname(bc.index);
          push(findProperty(multiname, true));
          break;
        case OP_findproperty:
          multiname = popMultiname(bc.index);
          push(findProperty(multiname, false));
          break;
        case OP_finddef:        notImplemented(); break;
        case OP_getlex:
          multiname = getMultiname(bc.index);
          push(getProperty(findProperty(multiname, true), multiname));
          break;
        case OP_initproperty:
        case OP_setproperty:
          value = state.stack.pop();
          multiname = popMultiname(bc.index);
          flushStack();
          obj = state.stack.pop();
          emit(setProperty(obj, multiname, value));
          break;
        case OP_getlocal:       push(local[bc.index]); break;
        case OP_setlocal:       setLocal(bc.index); break;
        case OP_getglobalscope:
          push(property(scopeName, "global.object"));
          break;
        case OP_getscopeobject:
          obj = scopeName;
          for (var i = 0; i < (state.scopeHeight - 1) - bc.index; i++) {
            obj = property(obj, "parent");
          }
          push(property(obj, "object"));
          break;
        case OP_getproperty:
          multiname = popMultiname(bc.index);
          obj = state.stack.pop();
          push(getProperty(obj, multiname));
          break;
        case OP_getouterscope:      notImplemented(); break;
        case OP_setpropertylate:    notImplemented(); break;
        case OP_deleteproperty:
          multiname = popMultiname(bc.index);
          obj = state.stack.pop();
          push(call(id("deleteProperty"), [obj, multiname]));
          flushStack();
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
        case OP_convert_s:      push(call(id("toString"), [state.stack.pop()])); break;
        case OP_esc_xelem:      notImplemented(); break;
        case OP_esc_xattr:      notImplemented(); break;
        case OP_coerce_i:
        case OP_convert_i:
          push(asInt32(state.stack.pop()));
          break;
        case OP_coerce_u:
        case OP_convert_u:
          push(call(id("toUint"), [state.stack.pop()]));
          break;
        case OP_coerce_d:
        case OP_convert_d:
          push(call(id("toDouble"), [state.stack.pop()]));
          break;
        case OP_coerce_b:
        case OP_convert_b:
          push(new UnaryExpression(Operator.FALSE, new UnaryExpression(Operator.FALSE, state.stack.pop())));
          break;
        case OP_convert_o:      notImplemented(); break;
        case OP_checkfilter:
          push(call(id("checkFilter"), [state.stack.pop()]));
          break;
        case OP_convert_f:      notImplemented(); break;
        case OP_unplus:         notImplemented(); break;
        case OP_convert_f4:     notImplemented(); break;
        case OP_coerce:
          value = state.stack.pop();
          multiname = getMultiname(bc.index);
          type = getProperty(findProperty(multiname, true), multiname);
          push(call(id("coerce"), [value, type]));
          break;
        case OP_coerce_a:       /* NOP */ break;
        case OP_coerce_s:       push(call(id("coerceString"), [state.stack.pop()])); break;
        case OP_astype:         notImplemented(); break;
        case OP_astypelate:     notImplemented(); break;
        case OP_coerce_o:       notImplemented(); break;
        case OP_negate:         expression(Operator.NEG); break;
        case OP_increment:
          push(constant(1));
          expression(Operator.ADD);
          break;
        case OP_inclocal:
          emit(new UpdateExpression("++", local[bc.index]));
          break;
        case OP_decrement:
          push(constant(1));
          expression(Operator.SUB);
          break;
        case OP_declocal:
          emit(new UpdateExpression("--", local[bc.index]));
          break;
        case OP_typeof:
          push(call(id("typeOf"), [state.stack.pop()]));
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
          type = state.stack.pop();
          value = state.stack.pop();
          push(call(id("instanceOf"), [value, type]));
          break;
        case OP_istype:
          value = state.stack.pop();
          multiname = getMultiname(bc.index);
          type = getProperty(findProperty(multiname, true), multiname);
          push(call(id("isType"), [value, type]));
          break;
        case OP_istypelate:
          type = state.stack.pop();
          value = state.stack.pop();
          push(call(id("isType"), [value, type]));
          break;
        case OP_in:             notImplemented(); break;
        case OP_increment_i:
          push(binary(Operator.ADD, asInt32(state.stack.pop()), constant(1)));
          break;
        case OP_decrement_i:
          push(binary(Operator.SUB, asInt32(state.stack.pop()), constant(1)));
          break;
        case OP_inclocal_i:     notImplemented(); break;
        case OP_declocal_i:     notImplemented(); break;
        case OP_negate_i:       notImplemented(); break;
        case OP_add_i:          notImplemented(); break;
        case OP_subtract_i:     notImplemented(); break;
        case OP_multiply_i:     notImplemented(); break;
        case OP_getlocal0:
        case OP_getlocal1:
        case OP_getlocal2:
        case OP_getlocal3:
          push(local[op - OP_getlocal0]);
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
          console.info("Not Implemented: " + bc);
        }

        if (writer) {
          state.trace(writer);
          writer.enter("body: {");
          for (var i = 0; i < body.length; i++) {
            writer.writeLn(generate(body[i]));
          }
          writer.leave("}");
        }
      }

      flushStack();

      return {node: new BlockStatement(body), condition: condition, state: state};
    }