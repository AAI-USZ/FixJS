function(expr, postfixContainer){
                var raw, constructor, cond,
                    ws = postfixContainer[0],
                    postfix = postfixContainer[1],
                    indicator = postfix.type;
                switch(indicator){
                  case 'if':
                  case 'unless':
                    raw = expr.raw + ws + postfix.raw;
                    constructor = (indicator == 'unless') ? Nodes.NegatedConditional : Nodes.Conditional;
                    cond = (indicator == 'unless') ? new Nodes.LogicalNotOp(postfix.cond).g() : postfix.cond;
                    return new constructor(cond, Nodes.Block.wrap(expr), null).r(raw).p(line, column)
                  case 'while':
                  case 'until':
                    raw = expr.raw + ws + postfix.raw;
                    constructor = (indicator == 'until') ? Nodes.NegatedWhile : Nodes.While;
                    cond = (indicator == 'until') ? new Nodes.LogicalNotOp(postfix.cond).g() : postfix.cond;
                    return new constructor(cond, Nodes.Block.wrap(expr)).r(raw).p(line, column)
                  case 'for-in':
                    raw = expr.raw + ws + postfix.raw;
                    return new Nodes.ForIn(postfix.val, postfix.key, postfix.list, postfix.step, postfix.filter, Nodes.Block.wrap(expr)).r(raw).p(line, column);
                  case 'for-of':
                    raw = expr.raw + ws + postfix.raw;
                    return new Nodes.ForOf(postfix.own, postfix.key, postfix.val, postfix.obj, postfix.filter, Nodes.Block.wrap(expr)).r(raw).p(line, column);
                }
              }