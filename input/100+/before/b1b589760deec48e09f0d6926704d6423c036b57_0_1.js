function induce(head, exit, save, loop, inLoopHead, lookupSwitch, fallthrough) {
        var v = [];

        while (head) {
          if (head.count > 1) {
            var exit2 = new BlockSet();
            var save2 = {};

            var cases = [];
            var heads = head.members();

            for (var i = 0, j = heads.length; i < j; i++) {
              var h = heads[i];
              var bid = h.bid;
              var c;

              if (h.loop && head.contains(h.loop.head)) {
                var loop2 = h.loop;
                if (!loop2.induced) {
                  var lheads = loop2.head.members();
                  var lheadsave = 0;

                  for (k = 0, l = lheads.length; k < l; k++) {
                    lheadsave += head.save[lheads[k].bid];
                  }

                  if (h.npreds - lheadsave > 0) {
                    // Don't even enter the loop if we're just going to exit
                    // anyways.
                    h.npreds -= head.save[bid];
                    h.save = head.save[bid];
                    c = induce(h, exit2, save2, loop);
                    cases.push(new Control.LabelCase(bid, c));
                  } else {
                    for (k = 0, l = lheads.length; k < l; k++) {
                      var lh = lheads[k];
                      var lbid = lh.bid;
                      lh.npreds -= lheadsave;
                      lh.save = lheadsave;
                    }
                    c = induce(h, exit2, save2, loop);
                    cases.push(new Control.LabelCase(loop2.head.toArray(), c));
                    loop2.induced = true;
                  }
                }
              } else {
                h.npreds -= head.save[bid];
                h.save = head.save[bid];
                c = induce(h, exit2, save2, loop);
                cases.push(new Control.LabelCase(bid, c));
              }
            }

            var pruned = [];
            var k = 0;
            for (var i = 0, j = cases.length; i < j; i++) {
              var c = cases[i];
              var bid = c.label;
              if (exit2.get(bid) && heads[i].npreds - save2[bid] > 0) {
                pruned.push(bid);
              } else {
                cases[k++] = c;
              }
            }
            cases.length = k;

            if (cases.length === 0) {
              for (var i = 0, j = pruned.length; i < j; i++) {
                var bid = pruned[i];
                save[bid] = (save[bid] || 0) + save2[bid];
                exit.set(bid);
              }
              break;
            }

            v.push(new Control.LabelSwitch(cases));

            head = maybe(exit2, save2);
            continue;
          }

          var h, bid;

          if (head.count === 1) {
            h = head.choose();
            bid = h.bid;
            h.npreds -= head.save[bid];
            h.save = head.save[bid];
          } else {
            h = head;
            bid = h.bid;
          }

          if (inLoopHead) {
            inLoopHead = false;
          } else {
            if (loop && !loop.body.get(bid)) {
              h.npreds += h.save;
              loop.exit.set(bid);
              loop.save[bid] = (loop.save[bid] || 0) + h.save;
              v.push(new Control.Break(bid, loop));
              break;
            }

            if (loop && h.loop === loop) {
              h.npreds += h.save;
              v.push(new Control.Continue(bid, loop));
              break;
            }

            if (h === fallthrough) {
              break;
            }

            if (h.npreds > 0) {
              h.npreds += h.save;
              save[bid] = (save[bid] || 0) + h.save;
              exit.set(bid);
              v.push(lookupSwitch ?
                     new Control.Break(bid, lookupSwitch) :
                     new Control.Exit(bid));
              break;
            }

            if (h.loop) {
              var l = h.loop;

              var body;
              if (l.head.count === 1) {
                body = induce(l.head.choose(), null, null, l, true);
              } else {
                var lcases = [];
                var lheads = l.head.members();

                for (var i = 0, j = lheads.length; i < j; i++) {
                  var lh = lheads[i];
                  var lbid = lh.bid;
                  var c = induce(lh, null, null, l, true);
                  lcases.push(new Control.LabelCase(lbid, c));
                }

                body = new Control.LabelSwitch(lcases);
              }

              v.push(new Control.Loop(body));
              head = maybe(l.exit, l.save);
              continue;
            }
          }

          var sv;
          var succs;
          var exit2 = new BlockSet();
          var save2 = {};

          if (hasExceptions && h.hasCatches) {
            var allSuccs = h.succs;
            var catchSuccs = [];
            succs = [];

            for (var i = 0, j = allSuccs.length; i < j; i++) {
              var s = allSuccs[i];
              (s.exception ? catchSuccs : succs).push(s);
            }

            var catches = [];
            for (var i = 0, j = catchSuccs.length; i < j; i++) {
              var t = catchSuccs[i];
              t.npreds -= 1;
              t.save = 1;
              var c = induce(t, exit2, save2, loop);
              var ex = t.exception;
              catches.push(new Control.Catch(ex.varName, ex.typeName, c));
            }

            sv = new Control.Try(h, catches);
          } else {
            succs = h.succs;
            sv = h;
          }

          if (h.end.op === OP_lookupswitch) {
            var cases = [];
            var targets = h.end.targets;

            for (var i = targets.length - 1; i >= 0; i--) {
              var t = targets[i];
              t.npreds -= 1;
              t.save = 1;
              var c = induce(t, exit2, save2, loop, null, h, targets[i + 1]);
              cases.unshift(new Control.Case(i, c));
            }

            // The last case is the default case.
            cases.top().index = undefined;

            v.push(new Control.Switch(sv, cases));
            head = maybe(exit2, save2);
          } else if (succs.length === 2) {
            var branch1 = succs[0];
            var branch2 = succs[1];

            branch1.npreds -= 1;
            branch1.save = 1;
            var c1 = induce(branch1, exit2, save2, loop);

            branch2.npreds -= 1;
            branch2.save = 1;
            var c2 = induce(branch2, exit2, save2, loop);

            v.push(new Control.If(sv, c1, c2));
            head = maybe(exit2, save2);
          } else {
            c = succs[0];

            if (hasExceptions && h.hasCatches) {
              if (sv.body.kind === Control.SEQ) {
                sv.body.push(new Control.Exit(c.bid));
              } else {
                sv.body = new Control.Seq([sv.body, new Control.Exit(c.bid)]);
              }

              save2[c.bid] = (save2[c.bid] || 0) + 1;
              exit2.set(c.bid);
              head = maybe(exit2, save2);
            } else {
              if (c) {
                c.npreds -= 1;
                c.save = 1;
              }
              head = c;
            }

            v.push(sv);
          }
        }

        if (v.length > 1) {
          return new Control.Seq(v);
        }

        return v[0];
      }