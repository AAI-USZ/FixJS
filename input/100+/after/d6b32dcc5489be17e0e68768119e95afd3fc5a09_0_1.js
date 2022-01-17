f
  const SEQ = 1;
  const LOOP = 2;
  const IF = 3;
  const CASE = 4;
  const SWITCH = 5;
  const LABEL_CASE = 6;
  const LABEL_SWITCH = 7;
  const EXIT = 8;
  const BREAK = 9;
  const CONTINUE = 10;
  const TRY = 11;
  const CATCH = 12;

  function Seq(body) {
    this.kind = SEQ;
    this.body = body;
  }

  Seq.prototype = {
    trace: function (writer) {
      var body = this.body;
      for (var i = 0, j = body.length; i < j; i++) {
        body[i].trace(writer);
      }
    },

    first: function () {
      return this.body[0];
    },

    slice: function (begin, end) {
      return new Seq(this.body.slice(begin, end));
    }
  };

  function Loop(body) {
    this.kind = LOOP;
    this.body = body;
  }

  Loop.prototype = {
    trace: function (writer) {
      writer.enter("loop {");
      this.body.trace(writer);
      writer.leave("}");
    }
  };

  function If(cond, then, els) {
    this.kind = IF;
    this.cond = cond;
    this.then = then;
    this.else = els;
    this.negated = false;
  }

  If.prototype = {
    trace: function (writer) {
      this.cond.trace(writer);
      writer.enter("if" + (this.negated ? " not" : "") + " {");
      this.then && this.then.trace(writer);
      if (this.else) {
        writer.outdent();
        writer.enter("} else {");
        this.else.trace(writer);
      }
      writer.leave("}");
    }
  };

  function Case(index, body) {
    this.kind = CASE;
    this.index = index;
    this.body = body;
  }

  Case.prototype = {
    trace: function (writer) {
      if (this.index >= 0) {
        writer.writeLn("case " + this.index + ":");
      } else {
        writer.writeLn("default:");
      }
      writer.indent();
      this.body && this.body.trace(writer);
      writer.outdent();
    }
  };

  function Switch(determinant, cases) {
    this.kind = SWITCH;
    this.determinant = determinant;
    this.cases = cases;
  }

  Switch.prototype = {
    trace: function (writer) {
      this.determinant.trace(writer);
      writer.writeLn("switch {");
      for (var i = 0, j = this.cases.length; i < j; i++) {
        this.cases[i].trace(writer);
      }
      writer.writeLn("}");
    }
  };

  function LabelCase(label, body) {
    this.kind = LABEL_CASE;
    this.label = label;
    this.body = body;
  }

  LabelCase.prototype = {
    trace: function (writer) {
      if (this.label.length) {
        writer.enter("if (label is " + this.label.join(" or ") + ") {");
      } else {
        writer.enter("if (label is " + this.label + ") {");
      }
      this.body && this.body.trace(writer);
      writer.leave("}");
    }
  };

  function LabelSwitch(cases) {
    var labelMap = {};

    for (var i = 0, j = cases.length; i < j; i++) {
      var c = cases[i];
      if (c.label.length) {
        for (var k = 0, l = c.label.length; k < l; k++) {
          labelMap[c.label[k]] = c;
        }
      } else {
        labelMap[c.label] = c;
      }
    }

    this.kind = LABEL_SWITCH;
    this.cases = cases;
    this.labelMap = labelMap;
  }

  LabelSwitch.prototype = {
    trace: function (writer) {
      for (var i = 0, j = this.cases.length; i < j; i++) {
        this.cases[i].trace(writer);
      }
    }
  };

  function Exit(label) {
    this.kind = EXIT;
    this.label = label;
  }

  Exit.prototype = {
    trace: function (writer) {
      writer.writeLn("label = " + this.label);
    }
  };

  function Break(label, head) {
    this.kind = BREAK;
    this.label = label;
    this.head = head;
  }

  Break.prototype = {
    trace: function (writer) {
      this.label && writer.writeLn("label = " + this.label);
      writer.writeLn("break");
    }
  };

  function Continue(label, head) {
    this.kind = CONTINUE;
    this.label = label;
    this.head = head;
    this.necessary = true;
  }

  Continue.prototype = {
    trace: function (writer) {
      this.label && writer.writeLn("label = " + this.label);
      this.necessary && writer.writeLn("continue");
    }
  };

  function Try(body, catches) {
    this.kind = TRY;
    this.body = body;
    this.catches = catches;
  }

  Try.prototype = {
    trace: function (writer) {
      writer.enter("try {");
      this.body.trace(writer);
      for (var i = 0, j = this.catches.length; i < j; i++) {
        this.catches[i].trace(writer);
      }
      writer.leave("}");
    }
  };

  function Catch(varName, typeName, body) {
    this.kind = CATCH;
    this.varName = varName;
    this.typeName = typeName;
    this.body = body;
  }

  Catch.prototype = {
    trace: function (writer) {
      writer.outdent();
      writer.enter("} catch (" + (this.varName || "e") +
                   (this.typeName ? (" : " + this.typeName) : "") + ") {");
      this.body.trace(writer);
    }
  };

  return {
    SEQ: SEQ,
    LOOP: LOOP,
    IF: IF,
    CASE: CASE,
    SWITCH: SWITCH,
    LABEL_CASE: LABEL_CASE,
    LABEL_SWITCH: LABEL_SWITCH,
    EXIT: EXIT,
    BREAK: BREAK,
    CONTINUE: CONTINUE,
    TRY: TRY,
    CATCH: CATCH,

    Seq: Seq,
    Loop: Loop,
    If: If,
    Case: Case,
    Switch: Switch,
    LabelCase: LabelCase,
    LabelSwitch: LabelSwitch,
    Exit: Exit,
    Break: Break,
    Continue: Continue,
    Try: Try,
    Catch: Catch
  };

})();
