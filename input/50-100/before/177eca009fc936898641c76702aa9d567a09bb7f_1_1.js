function(offset, line, column, ws0, args, ws1) {
              var raw = "[" + ws0 + args.raw + ws1 + "]";
              args = args ? args.list : [];
              return new Nodes.ArrayInitialiser(args).r(raw).p(line, column);
            }