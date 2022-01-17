function() {
  var AssignOp, BinOp, Block, Bool, NO, Primitive, Statement, UnaryOp, YES, any, beingDeclared, concatMap, difference, foldl, map, union, _ref,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('./helpers'), YES = _ref.YES, NO = _ref.NO, any = _ref.any, foldl = _ref.foldl, map = _ref.map, concatMap = _ref.concatMap, difference = _ref.difference, union = _ref.union;

  beingDeclared = function(assignment) {
    switch (assignment.className) {
      case 'Identifier':
        return [assignment];
      case 'AssignOp':
        return beingDeclared(assignment.assignee);
      case 'ArrayInitialiser':
        return concatMap(assignment.members, beingDeclared);
      case 'ObjectInitialiser':
        return concatMap(assignment.vals(), beingDeclared);
      default:
        throw new Error("beingDeclared: Non-exhaustive patterns in case: " + assignment.className);
    }
  };

  this.Node = (function() {

    function Node() {}

    Node.prototype.generated = false;

    Node.prototype.toJSON = function() {
      return {
        nodeType: this.className
      };
    };

    Node.prototype.isTruthy = NO;

    Node.prototype.isFalsey = NO;

    Node.prototype.childNodes = [];

    Node.prototype.envEnrichments = function() {
      var _this = this;
      return concatMap(this.childNodes, function(child) {
        var _ref1;
        return (_ref1 = _this[child]) != null ? _ref1.envEnrichments() : void 0;
      });
    };

    Node.prototype.mayHaveSideEffects = function(inScope) {
      var _this = this;
      return any(this.childNodes, function(child) {
        var _ref1;
        return (_ref1 = _this[child]) != null ? _ref1.mayHaveSideEffects(inScope) : void 0;
      });
    };

    Node.prototype.walk = function(fn, inScope, ancestry) {
      var child, childName, _i, _len, _ref1;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      _ref1 = this.childNodes;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        childName = _ref1[_i];
        child = this[childName];
        if (child != null) {
          while (child !== (child = (fn.call(child, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, child != null ? child.envEnrichments() : void 0);
          this[childName] = child;
        }
      }
      return this;
    };

    Node.prototype.r = function(raw) {
      this.raw = raw;
      return this;
    };

    Node.prototype.p = function(line, column) {
      this.line = line;
      this.column = column;
      return this;
    };

    Node.prototype.g = function() {
      this.generated = true;
      return this;
    };

    return Node;

  })();

  AssignOp = (function(_super) {

    __extends(AssignOp, _super);

    function AssignOp() {}

    AssignOp.prototype.childNodes = ['expr'];

    AssignOp.prototype.mayHaveSideEffects = function(inScope) {
      return (this.expr.mayHaveSideEffects(inScope)) || (beingDeclared(this.assignee)).length;
    };

    AssignOp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        assignee: this.assignee.toJSON(),
        expression: this.expr.toJSON()
      };
    };

    return AssignOp;

  })(this.Node);

  BinOp = (function(_super) {

    __extends(BinOp, _super);

    function BinOp() {}

    BinOp.prototype.childNodes = ['left', 'right'];

    BinOp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        left: this.left.toJSON(),
        right: this.right.toJSON()
      };
    };

    return BinOp;

  })(this.Node);

  Primitive = (function(_super) {

    __extends(Primitive, _super);

    function Primitive() {}

    Primitive.prototype.mayHaveSideEffects = NO;

    Primitive.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        data: this.data
      };
    };

    return Primitive;

  })(this.Node);

  Statement = (function(_super) {

    __extends(Statement, _super);

    function Statement() {}

    return Statement;

  })(this.Node);

  UnaryOp = (function(_super) {

    __extends(UnaryOp, _super);

    function UnaryOp() {}

    UnaryOp.prototype.childNodes = ['expr'];

    UnaryOp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        expression: this.expr.toJSON()
      };
    };

    return UnaryOp;

  })(this.Node);

  this.ArrayInitialiser = (function(_super) {

    __extends(ArrayInitialiser, _super);

    ArrayInitialiser.prototype.className = 'ArrayInitialiser';

    function ArrayInitialiser(members) {
      this.members = members;
    }

    ArrayInitialiser.prototype.walk = function(fn, inScope, ancestry) {
      var member;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      this.members = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.members;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          member = _ref1[_i];
          while (member !== (member = (fn.call(member, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, member.envEnrichments());
          _results.push(member);
        }
        return _results;
      }).call(this);
      return this;
    };

    ArrayInitialiser.prototype.isTruthy = YES;

    ArrayInitialiser.prototype.envEnrichments = function() {
      return concatMap(this.members, function(m) {
        return m.envEnrichments();
      });
    };

    ArrayInitialiser.prototype.mayHaveSideEffects = function(inScope) {
      return any(this.members, function(m) {
        return m.mayHaveSideEffects(inScope);
      });
    };

    ArrayInitialiser.prototype.toJSON = function() {
      var m;
      return {
        nodeType: this.className,
        members: (function() {
          var _i, _len, _ref1, _results;
          _ref1 = this.members;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            m = _ref1[_i];
            _results.push(m.toJSON());
          }
          return _results;
        }).call(this)
      };
    };

    return ArrayInitialiser;

  })(this.Node);

  this.AssignOp = (function(_super) {

    __extends(AssignOp, _super);

    AssignOp.prototype.className = 'AssignOp';

    function AssignOp(assignee, expr) {
      this.assignee = assignee;
      this.expr = expr;
    }

    AssignOp.prototype.isTruthy = function() {
      return this.expr.isTruthy();
    };

    AssignOp.prototype.isFalsey = function() {
      return this.expr.isFalsey();
    };

    AssignOp.prototype.envEnrichments = function() {
      return beingDeclared(this.assignee);
    };

    return AssignOp;

  })(AssignOp);

  this.BitAndOp = (function(_super) {

    __extends(BitAndOp, _super);

    BitAndOp.prototype.className = 'BitAndOp';

    function BitAndOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return BitAndOp;

  })(BinOp);

  this.BitNotOp = (function(_super) {

    __extends(BitNotOp, _super);

    BitNotOp.prototype.className = 'BitNotOp';

    function BitNotOp(expr) {
      this.expr = expr;
    }

    return BitNotOp;

  })(UnaryOp);

  this.BitOrOp = (function(_super) {

    __extends(BitOrOp, _super);

    BitOrOp.prototype.className = 'BitOrOp';

    function BitOrOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return BitOrOp;

  })(BinOp);

  this.BitXorOp = (function(_super) {

    __extends(BitXorOp, _super);

    BitXorOp.prototype.className = 'BitXorOp';

    function BitXorOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return BitXorOp;

  })(BinOp);

  Block = this.Block = (function(_super) {

    __extends(Block, _super);

    Block.prototype.className = 'Block';

    function Block(statements) {
      this.statements = statements;
    }

    Block.prototype.walk = function(fn, inScope, ancestry) {
      var statement;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      this.statements = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.statements;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          statement = _ref1[_i];
          while (statement !== (statement = (fn.call(statement, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, statement.envEnrichments());
          _results.push(statement);
        }
        return _results;
      }).call(this);
      return this;
    };

    Block.wrap = function(s) {
      return new Block([s]).r(s.raw).p(s.line, s.column);
    };

    Block.prototype.mayHaveSideEffects = function(inScope) {
      return any(this.statements, function(s) {
        return s.mayHaveSideEffects(inScope);
      });
    };

    Block.prototype.toJSON = function() {
      var s;
      return {
        nodeType: this.className,
        statements: (function() {
          var _i, _len, _ref1, _results;
          _ref1 = this.statements;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            s = _ref1[_i];
            _results.push(s.toJSON());
          }
          return _results;
        }).call(this)
      };
    };

    return Block;

  })(this.Node);

  Bool = this.Bool = (function(_super) {

    __extends(Bool, _super);

    Bool.prototype.className = 'Bool';

    function Bool(data) {
      this.data = data;
    }

    Bool.prototype.isTruthy = function() {
      return !!this.data;
    };

    Bool.prototype.isFalsey = function() {
      return !this.data;
    };

    return Bool;

  })(Primitive);

  this.Break = (function(_super) {

    __extends(Break, _super);

    Break.prototype.className = 'Break';

    function Break() {}

    Break.prototype.mayHaveSideEffects = NO;

    return Break;

  })(Statement);

  this.Class = (function(_super) {

    __extends(Class, _super);

    Class.prototype.className = 'Class';

    function Class(nameAssignment, parent, block) {
      this.nameAssignment = nameAssignment;
      this.parent = parent;
      this.block = block;
      this.name = (function() {
        if (this.nameAssignment != null) {
          switch (this.nameAssignment.className) {
            case 'Identifier':
              return this.nameAssignment.data;
            case 'MemberAccessOp':
            case 'ProtoMemberAccessOp':
            case 'SoakedMemberAccessOp':
            case 'SoakedProtoMemberAccessOp':
              return this.nameAssignment.memberName;
            default:
              return null;
          }
        } else {
          return null;
        }
      }).call(this);
    }

    Class.prototype.childNodes = ['parent', 'block'];

    Class.prototype.isTruthy = YES;

    Class.prototype.mayHaveSideEffects = function(inScope) {
      return (Class.__super__.mayHaveSideEffects.call(this, inScope)) || (this.nameAssignment != null) && any(beingDeclared(this.nameAssignment), function(v) {
        return __indexOf.call(inScope, v) >= 0;
      });
    };

    Class.prototype.toJSON = function() {
      var _ref1, _ref2, _ref3;
      return {
        nodeType: this.className,
        nameAssignment: (_ref1 = this.nameAssignment) != null ? _ref1.toJSON() : void 0,
        name: this.name,
        parent: (_ref2 = this.parent) != null ? _ref2.toJSON() : void 0,
        block: (_ref3 = this.block) != null ? _ref3.toJSON() : void 0
      };
    };

    return Class;

  })(this.Node);

  this.ClassProtoAssignOp = (function(_super) {

    __extends(ClassProtoAssignOp, _super);

    ClassProtoAssignOp.prototype.className = 'ClassProtoAssignOp';

    function ClassProtoAssignOp(assignee, expr) {
      this.assignee = assignee;
      this.expr = expr;
    }

    ClassProtoAssignOp.prototype.mayHaveSideEffects = NO;

    return ClassProtoAssignOp;

  })(AssignOp);

  this.CompoundAssignOp = (function(_super) {

    __extends(CompoundAssignOp, _super);

    CompoundAssignOp.prototype.className = 'CompoundAssignOp';

    function CompoundAssignOp(op, assignee, expr) {
      this.op = op;
      this.assignee = assignee;
      this.expr = expr;
    }

    CompoundAssignOp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        op: this.op.prototype.className,
        assignee: this.assignee.toJSON(),
        expression: this.expr.toJSON()
      };
    };

    return CompoundAssignOp;

  })(AssignOp);

  this.ConcatOp = (function(_super) {

    __extends(ConcatOp, _super);

    ConcatOp.prototype.className = 'ConcatOp';

    function ConcatOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return ConcatOp;

  })(BinOp);

  this.Conditional = (function(_super) {

    __extends(Conditional, _super);

    Conditional.prototype.className = 'Conditional';

    Conditional.prototype.childNodes = ['condition', 'block', 'elseBlock'];

    Conditional.prototype.isTruthy = function() {
      var _ref1, _ref2;
      return !!(this.condition.isTruthy() && ((_ref1 = this.block) != null ? _ref1.isTruthy() : void 0) || this.condition.isFalsey() && ((_ref2 = this.elseBlock) != null ? _ref2.isTruthy() : void 0));
    };

    Conditional.prototype.isFalsey = function() {
      var _ref1, _ref2;
      return !!(this.condition.isTruthy() && ((_ref1 = this.block) != null ? _ref1.isFalsey() : void 0) || this.condition.isFalsey() && ((_ref2 = this.elseBlock) != null ? _ref2.isFalsey() : void 0));
    };

    Conditional.prototype.mayHaveSideEffects = function(inScope) {
      var _ref1, _ref2;
      return !!((this.condition.mayHaveSideEffects(inScope)) || (!this.condition.isFalsey() && ((_ref1 = this.block) != null ? _ref1.mayHaveSideEffects(inScope) : void 0)) || (!this.condition.isTruthy() && ((_ref2 = this.elseBlock) != null ? _ref2.mayHaveSideEffects(inScope) : void 0)));
    };

    function Conditional(condition, block, elseBlock) {
      this.condition = condition;
      this.block = block;
      this.elseBlock = elseBlock;
    }

    Conditional.prototype.toJSON = function() {
      var _ref1, _ref2;
      return {
        nodeType: this.className,
        condition: this.condition.toJSON(),
        block: (_ref1 = this.block) != null ? _ref1.toJSON() : void 0,
        elseBlock: (_ref2 = this.elseBlock) != null ? _ref2.toJSON() : void 0
      };
    };

    return Conditional;

  })(this.Node);

  this.NegatedConditional = (function(_super) {

    __extends(NegatedConditional, _super);

    function NegatedConditional(condition, block, elseBlock) {
      this.condition = condition;
      this.block = block;
      this.elseBlock = elseBlock;
    }

    return NegatedConditional;

  })(this.Conditional);

  this.Continue = (function(_super) {

    __extends(Continue, _super);

    Continue.prototype.className = 'Continue';

    function Continue() {}

    Continue.prototype.mayHaveSideEffects = NO;

    return Continue;

  })(Statement);

  this.DeleteOp = (function(_super) {

    __extends(DeleteOp, _super);

    DeleteOp.prototype.className = 'DeleteOp';

    function DeleteOp(expr) {
      this.expr = expr;
    }

    DeleteOp.prototype.isTruthy = YES;

    DeleteOp.prototype.mayHaveSideEffects = YES;

    return DeleteOp;

  })(UnaryOp);

  this.DivideOp = (function(_super) {

    __extends(DivideOp, _super);

    DivideOp.prototype.className = 'DivideOp';

    function DivideOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return DivideOp;

  })(BinOp);

  this.DoOp = (function(_super) {

    __extends(DoOp, _super);

    DoOp.prototype.className = 'DoOp';

    function DoOp(expr) {
      this.expr = expr;
    }

    DoOp.prototype.mayHaveSideEffects = function(inScope) {
      var args, newScope, p, _ref1;
      if ((_ref1 = this.expr.className) !== 'Function' && _ref1 !== 'BoundFunction') {
        return true;
      }
      newScope = difference(inScope, concatMap(this.expr.parameters, beingDeclared));
      args = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = this.expr.parameters;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          p = _ref2[_i];
          if (p.className === 'AssignOp') {
            _results.push(p.expr);
          } else {
            _results.push(p);
          }
        }
        return _results;
      }).call(this);
      if (any(args, function(a) {
        return a.mayHaveSideEffects(newScope);
      })) {
        return true;
      }
      return this.expr.mayHaveSideEffects(newScope);
    };

    return DoOp;

  })(UnaryOp);

  this.DynamicMemberAccessOp = (function(_super) {

    __extends(DynamicMemberAccessOp, _super);

    DynamicMemberAccessOp.prototype.className = 'DynamicMemberAccessOp';

    function DynamicMemberAccessOp(expr, indexingExpr) {
      this.expr = expr;
      this.indexingExpr = indexingExpr;
    }

    DynamicMemberAccessOp.prototype.childNodes = ['expr', 'indexingExpr'];

    DynamicMemberAccessOp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        expression: this.expr.toJSON(),
        indexingExpression: this.indexingExpr.toJSON()
      };
    };

    return DynamicMemberAccessOp;

  })(this.Node);

  this.DynamicProtoMemberAccessOp = (function(_super) {

    __extends(DynamicProtoMemberAccessOp, _super);

    DynamicProtoMemberAccessOp.prototype.className = 'DynamicProtoMemberAccessOp';

    function DynamicProtoMemberAccessOp(expr, indexingExpr) {
      this.expr = expr;
      this.indexingExpr = indexingExpr;
    }

    return DynamicProtoMemberAccessOp;

  })(this.DynamicMemberAccessOp);

  this.SoakedDynamicMemberAccessOp = (function(_super) {

    __extends(SoakedDynamicMemberAccessOp, _super);

    SoakedDynamicMemberAccessOp.prototype.className = 'SoakedDynamicMemberAccessOp';

    function SoakedDynamicMemberAccessOp(expr, indexingExpr) {
      this.expr = expr;
      this.indexingExpr = indexingExpr;
    }

    return SoakedDynamicMemberAccessOp;

  })(this.DynamicMemberAccessOp);

  this.SoakedDynamicProtoMemberAccessOp = (function(_super) {

    __extends(SoakedDynamicProtoMemberAccessOp, _super);

    SoakedDynamicProtoMemberAccessOp.prototype.className = 'SoakedDynamicProtoMemberAccessOp';

    function SoakedDynamicProtoMemberAccessOp(expr, indexingExpr) {
      this.expr = expr;
      this.indexingExpr = indexingExpr;
    }

    return SoakedDynamicProtoMemberAccessOp;

  })(this.DynamicMemberAccessOp);

  this.EQOp = (function(_super) {

    __extends(EQOp, _super);

    EQOp.prototype.className = 'EQOp';

    function EQOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return EQOp;

  })(BinOp);

  this.ExistsAssignOp = (function(_super) {

    __extends(ExistsAssignOp, _super);

    ExistsAssignOp.prototype.className = 'ExistsAssignOp';

    function ExistsAssignOp(assignee, expr) {
      this.assignee = assignee;
      this.expr = expr;
    }

    return ExistsAssignOp;

  })(AssignOp);

  this.ExistsOp = (function(_super) {

    __extends(ExistsOp, _super);

    ExistsOp.prototype.className = 'ExistsOp';

    function ExistsOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return ExistsOp;

  })(BinOp);

  this.ExtendsOp = (function(_super) {

    __extends(ExtendsOp, _super);

    ExtendsOp.prototype.className = 'ExtendsOp';

    function ExtendsOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return ExtendsOp;

  })(BinOp);

  this.Float = (function(_super) {

    __extends(Float, _super);

    Float.prototype.className = 'Float';

    function Float(data) {
      this.data = data;
    }

    Float.prototype.isTruthy = function() {
      return !!this.data;
    };

    Float.prototype.isFalsey = function() {
      return !this.data;
    };

    return Float;

  })(Primitive);

  this.ForIn = (function(_super) {

    __extends(ForIn, _super);

    ForIn.prototype.className = 'ForIn';

    function ForIn(valAssignee, keyAssignee, expr, step, filterExpr, block) {
      this.valAssignee = valAssignee;
      this.keyAssignee = keyAssignee;
      this.expr = expr;
      this.step = step;
      this.filterExpr = filterExpr;
      this.block = block;
    }

    ForIn.prototype.childNodes = ['valAssignee', 'keyAssignee', 'expr', 'step', 'filterExpr', 'block'];

    ForIn.prototype.isTruthy = YES;

    ForIn.prototype.mayHaveSideEffects = YES;

    ForIn.prototype.toJSON = function() {
      var _ref1, _ref2;
      return {
        nodeType: this.className,
        valAssignee: this.valAssignee.toJSON(),
        keyAssignee: (_ref1 = this.keyAssignee) != null ? _ref1.toJSON() : void 0,
        expression: this.expr.toJSON(),
        step: this.step.toJSON(),
        filterExpression: (_ref2 = this.filterExpr) != null ? _ref2.toJSON() : void 0,
        block: this.block.toJSON()
      };
    };

    return ForIn;

  })(this.Node);

  this.ForOf = (function(_super) {

    __extends(ForOf, _super);

    ForOf.prototype.className = 'ForOf';

    function ForOf(isOwn, keyAssignee, valAssignee, expr, filterExpr, block) {
      this.isOwn = isOwn;
      this.keyAssignee = keyAssignee;
      this.valAssignee = valAssignee;
      this.expr = expr;
      this.filterExpr = filterExpr;
      this.block = block;
    }

    ForOf.prototype.childNodes = ['keyAssignee', 'valAssignee', 'expr', 'filterExpr', 'block'];

    ForOf.prototype.isTruthy = YES;

    ForOf.prototype.mayHaveSideEffects = YES;

    ForOf.prototype.toJSON = function() {
      var _ref1, _ref2;
      return {
        nodeType: this.className,
        isOwn: this.isOwn,
        keyAssignee: this.keyAssignee.toJSON(),
        valAssignee: (_ref1 = this.valAssignee) != null ? _ref1.toJSON() : void 0,
        expression: this.expr.toJSON(),
        filterExpression: (_ref2 = this.filterExpr) != null ? _ref2.toJSON() : void 0,
        block: this.block.toJSON()
      };
    };

    return ForOf;

  })(this.Node);

  this.Function = (function(_super) {

    __extends(Function, _super);

    Function.prototype.className = 'Function';

    function Function(parameters, block) {
      this.parameters = parameters;
      this.block = block;
    }

    Function.prototype.walk = function(fn, inScope, ancestry) {
      var param;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      this.parameters = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.parameters;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          param = _ref1[_i];
          while (param !== (param = (fn.call(param, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, param.envEnrichments());
          _results.push(param);
        }
        return _results;
      }).call(this);
      while (this.block !== (this.block = (fn.call(this.block, newScope, ancestry)).walk(fn, inScope, ancestry))) {
        continue;
      }
      return this;
    };

    Function.prototype.isTruthy = YES;

    Function.prototype.mayHaveSideEffects = NO;

    Function.prototype.toJSON = function() {
      var p, _ref1;
      return {
        nodeType: this.className,
        parameters: (function() {
          var _i, _len, _ref1, _results;
          _ref1 = this.parameters;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            p = _ref1[_i];
            _results.push(p.toJSON());
          }
          return _results;
        }).call(this),
        block: (_ref1 = this.block) != null ? _ref1.toJSON() : void 0
      };
    };

    return Function;

  })(this.Node);

  this.BoundFunction = (function(_super) {

    __extends(BoundFunction, _super);

    BoundFunction.prototype.className = 'BoundFunction';

    function BoundFunction(parameters, block) {
      this.parameters = parameters;
      this.block = block;
    }

    return BoundFunction;

  })(this.Function);

  this.FunctionApplication = (function(_super) {

    __extends(FunctionApplication, _super);

    FunctionApplication.prototype.className = 'FunctionApplication';

    function FunctionApplication(_function, _arguments) {
      this["function"] = _function;
      this["arguments"] = _arguments;
    }

    FunctionApplication.prototype.walk = function(fn, inScope, ancestry) {
      var arg;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      while (this["function"] !== (this["function"] = (fn.call(this["function"], inScope, ancestry)).walk(fn, inScope, ancestry))) {
        continue;
      }
      inScope = union(inScope, this["function"].envEnrichments());
      this["arguments"] = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this["arguments"];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          arg = _ref1[_i];
          while (arg !== (arg = (fn.call(arg, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, arg.envEnrichments());
          _results.push(arg);
        }
        return _results;
      }).call(this);
      return this;
    };

    FunctionApplication.prototype.mayHaveSideEffects = function(inScope) {
      var newScope, _ref1;
      if ((_ref1 = this["function"].className) !== 'Function' && _ref1 !== 'BoundFunction') {
        return true;
      }
      newScope = difference(inScope, concatMap(this["function"].parameters, beingDeclared));
      if (any(this["arguments"], function(a) {
        return a.mayHaveSideEffects(newScope);
      })) {
        return true;
      }
      return this["function"].block.mayHaveSideEffects(newScope);
    };

    FunctionApplication.prototype.toJSON = function() {
      var a;
      return {
        nodeType: this.className,
        "function": this["function"].toJSON(),
        "arguments": (function() {
          var _i, _len, _ref1, _results;
          _ref1 = this["arguments"];
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            a = _ref1[_i];
            _results.push(a.toJSON());
          }
          return _results;
        }).call(this)
      };
    };

    return FunctionApplication;

  })(this.Node);

  this.SoakedFunctionApplication = (function(_super) {

    __extends(SoakedFunctionApplication, _super);

    SoakedFunctionApplication.prototype.className = 'SoakedFunctionApplication';

    function SoakedFunctionApplication(_function, _arguments) {
      this["function"] = _function;
      this["arguments"] = _arguments;
    }

    return SoakedFunctionApplication;

  })(this.FunctionApplication);

  this.GTEOp = (function(_super) {

    __extends(GTEOp, _super);

    GTEOp.prototype.className = 'GTEOp';

    function GTEOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return GTEOp;

  })(BinOp);

  this.GTOp = (function(_super) {

    __extends(GTOp, _super);

    GTOp.prototype.className = 'GTOp';

    function GTOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return GTOp;

  })(BinOp);

  this.HeregExp = (function(_super) {

    __extends(HeregExp, _super);

    HeregExp.prototype.className = 'HeregExp';

    function HeregExp(expr, flags) {
      var flag, _i, _len, _ref1;
      this.expr = expr;
      this.flags = {};
      _ref1 = ['g', 'i', 'm', 'y'];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        flag = _ref1[_i];
        this.flags[flag] = __indexOf.call(flags, flag) >= 0;
      }
    }

    HeregExp.prototype.childNodes = ['expr'];

    HeregExp.prototype.isTruthy = YES;

    HeregExp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        expression: this.expr,
        flags: this.flags
      };
    };

    return HeregExp;

  })(this.Node);

  this.Identifier = (function(_super) {

    __extends(Identifier, _super);

    Identifier.prototype.className = 'Identifier';

    function Identifier(data) {
      this.data = data;
    }

    return Identifier;

  })(Primitive);

  this.InOp = (function(_super) {

    __extends(InOp, _super);

    InOp.prototype.className = 'InOp';

    function InOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return InOp;

  })(BinOp);

  this.InstanceofOp = (function(_super) {

    __extends(InstanceofOp, _super);

    InstanceofOp.prototype.className = 'InstanceofOp';

    function InstanceofOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return InstanceofOp;

  })(BinOp);

  this.Int = (function(_super) {

    __extends(Int, _super);

    Int.prototype.className = 'Int';

    function Int(data) {
      this.data = data;
    }

    Int.prototype.isTruthy = function() {
      return !!this.data;
    };

    Int.prototype.isFalsey = function() {
      return !this.data;
    };

    return Int;

  })(Primitive);

  this.JavaScript = (function(_super) {

    __extends(JavaScript, _super);

    JavaScript.prototype.className = 'JavaScript';

    JavaScript.prototype.mayHaveSideEffects = YES;

    function JavaScript(data) {
      this.data = data;
    }

    return JavaScript;

  })(Primitive);

  this.LTEOp = (function(_super) {

    __extends(LTEOp, _super);

    LTEOp.prototype.className = 'LTEOp';

    function LTEOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return LTEOp;

  })(BinOp);

  this.LTOp = (function(_super) {

    __extends(LTOp, _super);

    LTOp.prototype.className = 'LTOp';

    function LTOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return LTOp;

  })(BinOp);

  this.LeftShiftOp = (function(_super) {

    __extends(LeftShiftOp, _super);

    LeftShiftOp.prototype.className = 'LeftShiftOp';

    function LeftShiftOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return LeftShiftOp;

  })(BinOp);

  this.LogicalAndOp = (function(_super) {

    __extends(LogicalAndOp, _super);

    LogicalAndOp.prototype.className = 'LogicalAndOp';

    LogicalAndOp.prototype.isTruthy = function() {
      return this.left.isTruthy() && this.right.isTruthy();
    };

    LogicalAndOp.prototype.isFalsey = function() {
      return this.left.isFalsey() || this.right.isFalsey();
    };

    function LogicalAndOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return LogicalAndOp;

  })(BinOp);

  this.LogicalNotOp = (function(_super) {

    __extends(LogicalNotOp, _super);

    LogicalNotOp.prototype.className = 'LogicalNotOp';

    function LogicalNotOp(expr) {
      this.expr = expr;
    }

    LogicalNotOp.prototype.isTruthy = function() {
      return this.expr.isFalsey();
    };

    LogicalNotOp.prototype.isFalsey = function() {
      return this.expr.isTruthy();
    };

    return LogicalNotOp;

  })(UnaryOp);

  this.LogicalOrOp = (function(_super) {

    __extends(LogicalOrOp, _super);

    LogicalOrOp.prototype.className = 'LogicalOrOp';

    function LogicalOrOp(left, right) {
      this.left = left;
      this.right = right;
    }

    LogicalOrOp.prototype.isTruthy = function() {
      return this.left.isTruthy() || this.right.isTruthy();
    };

    LogicalOrOp.prototype.isFalsey = function() {
      return this.left.isFalsey() && this.right.isFalsey();
    };

    return LogicalOrOp;

  })(BinOp);

  this.MemberAccessOp = (function(_super) {

    __extends(MemberAccessOp, _super);

    MemberAccessOp.prototype.className = 'MemberAccessOp';

    function MemberAccessOp(expr, memberName) {
      this.expr = expr;
      this.memberName = memberName;
    }

    MemberAccessOp.prototype.childNodes = ['expr'];

    MemberAccessOp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        expression: this.expr.toJSON(),
        memberName: this.memberName
      };
    };

    return MemberAccessOp;

  })(this.Node);

  this.ProtoMemberAccessOp = (function(_super) {

    __extends(ProtoMemberAccessOp, _super);

    ProtoMemberAccessOp.prototype.className = 'ProtoMemberAccessOp';

    function ProtoMemberAccessOp(expr, memberName) {
      this.expr = expr;
      this.memberName = memberName;
    }

    return ProtoMemberAccessOp;

  })(this.MemberAccessOp);

  this.SoakedMemberAccessOp = (function(_super) {

    __extends(SoakedMemberAccessOp, _super);

    SoakedMemberAccessOp.prototype.className = 'SoakedMemberAccessOp';

    function SoakedMemberAccessOp(expr, memberName) {
      this.expr = expr;
      this.memberName = memberName;
    }

    return SoakedMemberAccessOp;

  })(this.MemberAccessOp);

  this.SoakedProtoMemberAccessOp = (function(_super) {

    __extends(SoakedProtoMemberAccessOp, _super);

    SoakedProtoMemberAccessOp.prototype.className = 'SoakedProtoMemberAccessOp';

    function SoakedProtoMemberAccessOp(expr, memberName) {
      this.expr = expr;
      this.memberName = memberName;
    }

    return SoakedProtoMemberAccessOp;

  })(this.MemberAccessOp);

  this.MultiplyOp = (function(_super) {

    __extends(MultiplyOp, _super);

    MultiplyOp.prototype.className = 'MultiplyOp';

    function MultiplyOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return MultiplyOp;

  })(BinOp);

  this.NEQOp = (function(_super) {

    __extends(NEQOp, _super);

    NEQOp.prototype.className = 'NEQOp';

    function NEQOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return NEQOp;

  })(BinOp);

  this.NewOp = (function(_super) {

    __extends(NewOp, _super);

    NewOp.prototype.className = 'NewOp';

    function NewOp(ctor, _arguments) {
      this.ctor = ctor;
      this["arguments"] = _arguments;
    }

    NewOp.prototype.walk = function(fn, inScope, ancestry) {
      var arg;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      while (this.ctor !== (this.ctor = (fn.call(this.ctor, inScope, ancestry)).walk(fn, inScope, ancestry))) {
        continue;
      }
      inScope = union(inScope, this.ctor.envEnrichments());
      this["arguments"] = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this["arguments"];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          arg = _ref1[_i];
          while (arg !== (arg = (fn.call(arg, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, arg.envEnrichments());
          _results.push(arg);
        }
        return _results;
      }).call(this);
      return this;
    };

    NewOp.prototype.mayHaveSideEffects = YES;

    NewOp.prototype.toJSON = function() {
      var a;
      return {
        nodeType: this.className,
        constructor: this.ctor.toJSON(),
        "arguments": (function() {
          var _i, _len, _ref1, _results;
          _ref1 = this["arguments"];
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            a = _ref1[_i];
            _results.push(a.toJSON());
          }
          return _results;
        }).call(this)
      };
    };

    return NewOp;

  })(this.Node);

  this.Null = (function(_super) {

    __extends(Null, _super);

    Null.prototype.className = 'Null';

    function Null() {}

    Null.prototype.isFalsey = YES;

    Null.prototype.mayHaveSideEffects = NO;

    return Null;

  })(Statement);

  this.ObjectInitialiser = (function(_super) {

    __extends(ObjectInitialiser, _super);

    ObjectInitialiser.prototype.className = 'ObjectInitialiser';

    function ObjectInitialiser(members) {
      this.members = members;
    }

    ObjectInitialiser.prototype.walk = function(fn, inScope, ancestry) {
      var key, val;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      this.members = (function() {
        var _i, _len, _ref1, _ref2, _results;
        _ref1 = this.members;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          _ref2 = _ref1[_i], key = _ref2[0], val = _ref2[1];
          while (val !== (val = (fn.call(val, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, val.envEnrichments());
          _results.push([key, val]);
        }
        return _results;
      }).call(this);
      return this;
    };

    ObjectInitialiser.prototype.isTruthy = YES;

    ObjectInitialiser.prototype.mayHaveSideEffects = function(inScope) {
      return any(this.members, function(_arg) {
        var expr, key;
        key = _arg[0], expr = _arg[1];
        return (key.mayHaveSideEffects(inScope)) || expr.mayHaveSideEffects(inScope);
      });
    };

    ObjectInitialiser.prototype.keys = function() {
      return map(this.members(function(_arg) {
        var key, val;
        key = _arg[0], val = _arg[1];
        return key;
      }));
    };

    ObjectInitialiser.prototype.vals = function() {
      return map(this.members(function(_arg) {
        var key, val;
        key = _arg[0], val = _arg[1];
        return val;
      }));
    };

    ObjectInitialiser.prototype.toJSON = function() {
      var expr, key;
      return {
        nodeType: this.className,
        members: (function() {
          var _i, _len, _ref1, _ref2, _results;
          _ref1 = this.members;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            _ref2 = _ref1[_i], key = _ref2[0], expr = _ref2[1];
            _results.push([key.toJSON(), expr.toJSON()]);
          }
          return _results;
        }).call(this)
      };
    };

    return ObjectInitialiser;

  })(this.Node);

  this.OfOp = (function(_super) {

    __extends(OfOp, _super);

    OfOp.prototype.className = 'OfOp';

    function OfOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return OfOp;

  })(BinOp);

  this.PlusOp = (function(_super) {

    __extends(PlusOp, _super);

    PlusOp.prototype.className = 'PlusOp';

    function PlusOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return PlusOp;

  })(BinOp);

  this.PreDecrementOp = (function(_super) {

    __extends(PreDecrementOp, _super);

    PreDecrementOp.prototype.className = 'PreDecrementOp';

    function PreDecrementOp(expr) {
      this.expr = expr;
    }

    PreDecrementOp.prototype.mayHaveSideEffects = YES;

    return PreDecrementOp;

  })(UnaryOp);

  this.PreIncrementOp = (function(_super) {

    __extends(PreIncrementOp, _super);

    PreIncrementOp.prototype.className = 'PreIncrementOp';

    function PreIncrementOp(expr) {
      this.expr = expr;
    }

    PreIncrementOp.prototype.mayHaveSideEffects = YES;

    return PreIncrementOp;

  })(UnaryOp);

  this.PostDecrementOp = (function(_super) {

    __extends(PostDecrementOp, _super);

    PostDecrementOp.prototype.className = 'PostDecrementOp';

    function PostDecrementOp(expr) {
      this.expr = expr;
    }

    PostDecrementOp.prototype.mayHaveSideEffects = YES;

    return PostDecrementOp;

  })(UnaryOp);

  this.PostIncrementOp = (function(_super) {

    __extends(PostIncrementOp, _super);

    PostIncrementOp.prototype.className = 'PostIncrementOp';

    function PostIncrementOp(expr) {
      this.expr = expr;
    }

    PostIncrementOp.prototype.mayHaveSideEffects = YES;

    return PostIncrementOp;

  })(UnaryOp);

  this.Program = (function(_super) {

    __extends(Program, _super);

    Program.prototype.className = 'Program';

    function Program(block) {
      this.block = block;
    }

    Program.prototype.childNodes = ['block'];

    Program.prototype.isTruthy = function() {
      var _ref1;
      return !!((_ref1 = this.block) != null ? _ref1.isTruthy() : void 0);
    };

    Program.prototype.isFalsey = function() {
      var _ref1;
      return !!((_ref1 = this.block) != null ? _ref1.isFalsey() : void 0);
    };

    Program.prototype.toJSON = function() {
      var _ref1;
      return {
        nodeType: this.className,
        block: (_ref1 = this.block) != null ? _ref1.toJSON() : void 0
      };
    };

    return Program;

  })(this.Node);

  this.Range = (function(_super) {

    __extends(Range, _super);

    Range.prototype.className = 'Range';

    function Range(isInclusive, left, right) {
      this.isInclusive = isInclusive;
      this.left = left;
      this.right = right;
    }

    Range.prototype.childNodes = BinOp.prototype.childNodes;

    Range.prototype.isTruthy = YES;

    Range.prototype.mayHaveSideEffects = BinOp.prototype.mayHaveSideEffects;

    Range.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        isInclusive: this.isInclusive,
        left: this.left.toJSON(),
        right: this.right.toJSON()
      };
    };

    return Range;

  })(this.Node);

  this.RegExp = (function(_super) {

    __extends(RegExp, _super);

    RegExp.prototype.className = 'RegExp';

    function RegExp(data, flags) {
      var flag, _i, _len, _ref1;
      this.data = data;
      this.flags = {};
      _ref1 = ['g', 'i', 'm', 'y'];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        flag = _ref1[_i];
        this.flags[flag] = __indexOf.call(flags, flag) >= 0;
      }
    }

    RegExp.prototype.isTruthy = YES;

    RegExp.prototype.mayHaveSideEffects = NO;

    RegExp.prototype.toJSON = function() {
      return {
        nodeType: this.className,
        data: this.data,
        flags: this.flags
      };
    };

    return RegExp;

  })(this.Node);

  this.RemOp = (function(_super) {

    __extends(RemOp, _super);

    RemOp.prototype.className = 'RemOp';

    function RemOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return RemOp;

  })(BinOp);

  this.Rest = (function(_super) {

    __extends(Rest, _super);

    Rest.prototype.className = 'Rest';

    function Rest(expr) {
      this.expr = expr;
    }

    return Rest;

  })(UnaryOp);

  this.Return = (function(_super) {

    __extends(Return, _super);

    Return.prototype.className = 'Return';

    function Return(expr) {
      this.expr = expr;
    }

    return Return;

  })(UnaryOp);

  this.SeqOp = (function(_super) {

    __extends(SeqOp, _super);

    SeqOp.prototype.className = 'SeqOp';

    function SeqOp(left, right) {
      this.left = left;
      this.right = right;
    }

    SeqOp.prototype.isTruthy = function() {
      return this.right.isTruthy();
    };

    SeqOp.prototype.isFalsey = function() {
      return this.right.isFalsey();
    };

    return SeqOp;

  })(BinOp);

  this.SignedRightShiftOp = (function(_super) {

    __extends(SignedRightShiftOp, _super);

    SignedRightShiftOp.prototype.className = 'SignedRightShiftOp';

    function SignedRightShiftOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return SignedRightShiftOp;

  })(BinOp);

  this.Slice = (function(_super) {

    __extends(Slice, _super);

    Slice.prototype.className = 'Slice';

    function Slice(expr, isInclusive, left, right) {
      this.expr = expr;
      this.isInclusive = isInclusive;
      this.left = left;
      this.right = right;
    }

    Slice.prototype.childNodes = ['expr', 'left', 'right'];

    Slice.prototype.isTruthy = YES;

    Slice.prototype.toJSON = function() {
      var _ref1, _ref2;
      return {
        nodeType: this.className,
        expression: this.expr.toJSON(),
        isInclusive: this.isInclusive,
        left: (_ref1 = this.left) != null ? _ref1.toJSON() : void 0,
        right: (_ref2 = this.right) != null ? _ref2.toJSON() : void 0
      };
    };

    return Slice;

  })(this.Node);

  this.Spread = (function(_super) {

    __extends(Spread, _super);

    Spread.prototype.className = 'Spread';

    function Spread(expr) {
      this.expr = expr;
    }

    return Spread;

  })(UnaryOp);

  this.String = (function(_super) {

    __extends(String, _super);

    String.prototype.className = 'String';

    function String(data) {
      this.data = data;
    }

    String.prototype.isTruthy = function() {
      return !!this.data;
    };

    String.prototype.isFalsey = function() {
      return !this.data;
    };

    return String;

  })(Primitive);

  this.SubtractOp = (function(_super) {

    __extends(SubtractOp, _super);

    SubtractOp.prototype.className = 'SubtractOp';

    function SubtractOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return SubtractOp;

  })(BinOp);

  this.Super = (function(_super) {

    __extends(Super, _super);

    Super.prototype.className = 'Super';

    function Super(_arguments) {
      this["arguments"] = _arguments;
    }

    Super.prototype.walk = function(fn, inScope, ancestry) {
      var arg;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      this["arguments"] = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this["arguments"];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          arg = _ref1[_i];
          while (arg !== (arg = (fn.call(arg, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, arg.envEnrichments());
          _results.push(arg);
        }
        return _results;
      }).call(this);
      return this;
    };

    Super.prototype.mayHaveSideEffects = YES;

    Super.prototype.toJSON = function() {
      var a;
      return {
        nodeType: this.className,
        "arguments": (function() {
          var _i, _len, _ref1, _results;
          _ref1 = this["arguments"];
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            a = _ref1[_i];
            _results.push(a.toJSON());
          }
          return _results;
        }).call(this)
      };
    };

    return Super;

  })(this.Node);

  this.Switch = (function(_super) {

    __extends(Switch, _super);

    Switch.prototype.className = 'Switch';

    function Switch(expr, cases, elseBlock) {
      this.expr = expr;
      this.cases = cases;
      this.elseBlock = elseBlock;
    }

    Switch.prototype.walk = function(fn, inScope, ancestry) {
      var block, cond, conds;
      if (inScope == null) {
        inScope = [];
      }
      if (ancestry == null) {
        ancestry = [];
      }
      ancestry = [this].concat(__slice.call(ancestry));
      if (this.expr != null) {
        while (this.expr !== (this.expr = (fn.call(this.expr, inScope, ancestry)).walk(fn, inScope, ancestry))) {
          continue;
        }
        inScope = union(inScope, this.expr.envEnrichments());
      }
      this.cases = (function() {
        var _i, _len, _ref1, _ref2, _results;
        _ref1 = this.cases;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          _ref2 = _ref1[_i], conds = _ref2[0], block = _ref2[1];
          conds = (function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = conds.length; _j < _len1; _j++) {
              cond = conds[_j];
              while (cond !== (cond = (fn.call(cond, inScope, ancestry)).walk(fn, inScope, ancestry))) {
                continue;
              }
              _results1.push(inScope = union(inScope, cond.envEnrichments()));
            }
            return _results1;
          })();
          while (block !== (block = (fn.call(block, inScope, ancestry)).walk(fn, inScope, ancestry))) {
            continue;
          }
          inScope = union(inScope, block.envEnrichments());
          _results.push([conds, block]);
        }
        return _results;
      }).call(this);
      if (typeof elseBlock !== "undefined" && elseBlock !== null) {
        while (this.elseBlock !== (this.elseBlock = (fn.call(this.elseBlock, inScope, ancestry)).walk(fn, inScope, ancestry))) {
          continue;
        }
      }
      return this;
    };

    Switch.prototype.mayHaveSideEffects = YES;

    Switch.prototype.toJSON = function() {
      var block, e, exprs, _ref1, _ref2;
      return {
        nodeType: this.className,
        expression: (_ref1 = this.expr) != null ? _ref1.toJSON() : void 0,
        cases: (function() {
          var _i, _len, _ref2, _ref3, _results;
          _ref2 = this.cases;
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            _ref3 = _ref2[_i], exprs = _ref3[0], block = _ref3[1];
            _results.push([
              (function() {
                var _j, _len1, _results1;
                _results1 = [];
                for (_j = 0, _len1 = exprs.length; _j < _len1; _j++) {
                  e = exprs[_j];
                  _results1.push(e.toJSON());
                }
                return _results1;
              })(), block.toJSON()
            ]);
          }
          return _results;
        }).call(this),
        elseBlock: (_ref2 = this.elseBlock) != null ? _ref2.toJSON() : void 0
      };
    };

    return Switch;

  })(this.Node);

  this.This = (function(_super) {

    __extends(This, _super);

    This.prototype.className = 'This';

    function This() {}

    This.prototype.mayHaveSideEffects = NO;

    return This;

  })(Statement);

  this.Throw = (function(_super) {

    __extends(Throw, _super);

    Throw.prototype.className = 'Throw';

    function Throw(expr) {
      this.expr = expr;
    }

    return Throw;

  })(UnaryOp);

  this.Try = (function(_super) {

    __extends(Try, _super);

    Try.prototype.className = 'Try';

    function Try(block, catchAssignee, catchBlock, finallyBlock) {
      this.block = block;
      this.catchAssignee = catchAssignee;
      this.catchBlock = catchBlock;
      this.finallyBlock = finallyBlock;
    }

    Try.prototype.childNodes = ['block', 'catchBlock', 'finallyBlock'];

    Try.prototype.toJSON = function() {
      var _ref1, _ref2, _ref3;
      return {
        nodeType: this.className,
        block: this.block.toJSON(),
        catchAssignee: (_ref1 = this.catchAssignee) != null ? _ref1.toJSON() : void 0,
        catchBlock: (_ref2 = this.catchBlock) != null ? _ref2.toJSON() : void 0,
        finallyBlock: (_ref3 = this.finallyBlock) != null ? _ref3.toJSON() : void 0
      };
    };

    return Try;

  })(this.Node);

  this.TypeofOp = (function(_super) {

    __extends(TypeofOp, _super);

    TypeofOp.prototype.className = 'TypeofOp';

    function TypeofOp(expr) {
      this.expr = expr;
    }

    TypeofOp.prototype.isTruthy = YES;

    return TypeofOp;

  })(UnaryOp);

  this.UnaryExistsOp = (function(_super) {

    __extends(UnaryExistsOp, _super);

    UnaryExistsOp.prototype.className = 'UnaryExistsOp';

    function UnaryExistsOp(expr) {
      this.expr = expr;
    }

    return UnaryExistsOp;

  })(UnaryOp);

  this.UnaryNegateOp = (function(_super) {

    __extends(UnaryNegateOp, _super);

    UnaryNegateOp.prototype.className = 'UnaryNegateOp';

    function UnaryNegateOp(expr) {
      this.expr = expr;
    }

    return UnaryNegateOp;

  })(UnaryOp);

  this.UnaryPlusOp = (function(_super) {

    __extends(UnaryPlusOp, _super);

    UnaryPlusOp.prototype.className = 'UnaryPlusOp';

    function UnaryPlusOp(expr) {
      this.expr = expr;
    }

    return UnaryPlusOp;

  })(UnaryOp);

  this.Undefined = (function(_super) {

    __extends(Undefined, _super);

    Undefined.prototype.className = 'Undefined';

    function Undefined() {}

    Undefined.prototype.isFalsey = YES;

    Undefined.prototype.mayHaveSideEffects = NO;

    return Undefined;

  })(Statement);

  this.UnsignedRightShiftOp = (function(_super) {

    __extends(UnsignedRightShiftOp, _super);

    UnsignedRightShiftOp.prototype.className = 'UnsignedRightShiftOp';

    function UnsignedRightShiftOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return UnsignedRightShiftOp;

  })(BinOp);

  this.While = (function(_super) {

    __extends(While, _super);

    While.prototype.className = 'While';

    function While(condition, block) {
      this.condition = condition;
      this.block = block;
    }

    While.prototype.childNodes = ['condition', 'block'];

    While.prototype.isTruthy = YES;

    While.prototype.mayHaveSideEffects = function(inScope) {
      return (this.condition.mayHaveSideEffects(inScope)) || (!this.condition.isFalsey() && this.block.mayHaveSideEffects(inScope));
    };

    While.prototype.toJSON = function() {
      var _ref1;
      return {
        nodeType: this.className,
        condition: this.condition.toJSON(),
        block: (_ref1 = this.block) != null ? _ref1.toJSON() : void 0
      };
    };

    return While;

  })(this.Node);

  this.NegatedWhile = (function(_super) {

    __extends(NegatedWhile, _super);

    function NegatedWhile(condition, block) {
      this.condition = condition;
      this.block = block;
    }

    return NegatedWhile;

  })(this.While);

  this.Loop = (function(_super) {

    __extends(Loop, _super);

    function Loop(block) {
      this.block = block;
      this.condition = (new Bool(true)).g();
    }

    return Loop;

  })(this.While);

}