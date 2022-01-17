function(offset, line, column, ws, members, t) {
            var raw = "{" + ws + (members ? members[0].raw + members[1] : '') + t + "}";
            members = members ? members[0].list : [];
            return new Nodes.ObjectInitialiser(members).r(raw).p(line, column);
          }