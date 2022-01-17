function(offset, line, column, left, right) {
              if(!right) return left;
              var raw = left.raw + right[0] + right[1] + right[3] + right[4] + right[5].raw;
              return new Nodes.LogicalOrOp(left, right[5]).r(raw).p(line, column);
            }