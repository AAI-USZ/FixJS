function(offset, line, column, left, right) {
                if(!right) return left;
                var op = constructorLookup[right[3]],
                    raw = left.raw + right[0] + 'not' + right[2] + right[3] + right[4] + right[5].raw;
                return new Nodes.LogicalNotOp(new op(left, right[5]).r(raw).p(line, column)).r(raw).g();
              }