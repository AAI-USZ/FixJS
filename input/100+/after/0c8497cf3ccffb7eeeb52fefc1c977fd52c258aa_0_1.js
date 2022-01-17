function(ancestors) {
      var _ref1;
      switch (false) {
        case !!(ancestors[0] != null):
          return true;
        case !ancestors[0]["instanceof"](Program, Class):
          return false;
        case !(ancestors[0]["instanceof"](SeqOp)):
          return this === ancestors[0].right;
        case !((ancestors[0]["instanceof"](Block)) && (ancestors[0].statements.indexOf(this)) !== ancestors[0].statements.length - 1):
          return false;
        case !((ancestors[0]["instanceof"](Function, BoundFunction)) && ancestors[0].body === this && ((_ref1 = ancestors[1]) != null ? _ref1["instanceof"](ClassProtoAssignOp) : void 0) && (ancestors[1].assignee instanceof String) && ancestors[1].assignee.data === 'constructor'):
          return false;
        default:
          return true;
      }
    }