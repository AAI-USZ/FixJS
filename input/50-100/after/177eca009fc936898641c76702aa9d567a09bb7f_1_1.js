function(offset, line, column, ws0, members, t, ws1) {
              var raw = "[" + ws0 + members.raw + t + ws1 + "]";
              members = members.list;
              return new Nodes.ArrayInitialiser(members).r(raw).p(line, column);
            }