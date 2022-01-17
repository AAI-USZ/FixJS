function(offset, line, column, all) {
                var raw = all[0].raw + all[1] + all[2] + '=' + all[4] + all[5].raw;
                return new Nodes.CompoundAssignOp(constructorLookup[all[2]], all[0], all[5]).r(raw).p(line, column);
              }