function induceControlTree() {
      const hasExceptions = this.method.exceptions.length > 0;
      const BlockSet = this.BlockSet;

      function maybe(exit, save) {
        exit.recount();
        if (exit.count === 0) {
          return null;
        }
        exit.save = save;
        return exit;
      }

      var indent = "";

      //
      // Based on emscripten's relooper algorithm.
      // The algorithm is O(|E|) -- it visits every edge in the CFG once.
      //
      // Loop header detection is done separately, using an overlaid DJ graph.
      //
      // For a vertex v, let succ(v) denote its non-exceptional successors.
      //
      // Basic blocks can be restructured into 4 types of nodes:
      //
      //  1. Switch. |succ(v) > 2|
      //  2. If.     |succ(v) = 2|
      //  3. Plain.  |succ(v) = 1|
      //  4. Loop.   marked as a loop header.
      //
      // The idea is fairly simple: start at a set of heads, induce all its
      // successors recursively in that head's context, discharging the edges
      // that we take. If a vertex no longer has any incoming edges when we
      // visit it, emit the vertex, else emit a label marking that we need to
      // go to that vertex and mark that vertex as an exit in the current
      // context.
      //
      // The algorithm starts at the root, the first instruction.
      //
      // Exceptions are restructured via rewriting. AVM bytecode stores try
      // blocks as a range of bytecode positions. Our basic blocks respects
      // these range boundaries. Each basic block which is in one or more of
      // such exception ranges have exceptional successors (jumps) to all
      // matching catch blocks. We then restructure the entire basic block as
      // a try and have the restructuring take care of the jumps to the actual
      // catch blocks. Finally blocks fall out naturally, but are not emitted
      // as JavaScript |finally|.
      //
      // Implementation Notes
      // --------------------
      //
      // We discharge edges by keeping a property |npreds| on each block that
      // says how many incoming edges we have _not yet_ discharged. We
      // discharge edges as we recur on the tree, but in case we can't emit a
      // block (i.e. its |npreds| > 0), we need to restore its |npreds| before
      // we pop out. We do this via a |save| proeprty on each block that says
      // how many predecessors we should restore.
      //
      // |exit| is the set of exits in the current context, i.e. the set of
      // vertices that we visited but have not yet discharged every incoming
      // edge.
      //
      // |save| is a mapping of block id -> save numbers.
      //
      // When setting an exit in the exit set, the save number must be set for
      // it also in the save set.
      //
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

      var root = this.blocks[0];
      this.controlTree = induce(root, new BlockSet(), {});
    }