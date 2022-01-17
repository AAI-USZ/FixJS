functionHandler = function() {
          var args, bf, boundArgs, checked, clean_rng, i, max_i, res, thisc;
          args = [];
          if (options && options.checkStack && !(options.checkStack(stack))) {
            throw new Error("stack checking failed");
          }
          if (typeof options.pre === "function" && !options.pre(this)) {
            blame(neg, pos, "precondition: " + options.pre.toString(), "[failed precondition]", parents);
          }
          i = 0;
          max_i = Math.max(dom != null ? dom.length : void 0, arguments.length);
          while (i < max_i) {
            checked = dom[i] ? dom[i].check(arguments[i], neg, pos, parents, stack) : arguments[i];
            if (i < arguments.length) {
              args[i] = checked;
            }
            i++;
          }
          if (typeof rng === "function") {
            clean_rng = rng.call(this, args);
            if (!(clean_rng instanceof Contract)) {
              throw new Error("range argument to function contract is not a contract");
            }
          } else {
            clean_rng = rng;
            if (!(clean_rng instanceof Contract)) {
              throw new Error("range argument to function contract is not a contract");
            }
          }
          if (options.isNew || options.newSafe) {
            boundArgs = [].concat.apply([null], args);
            bf = f.bind.apply(f, boundArgs);
            res = new bf();
            res = clean_rng.check(res, pos, neg, parents, stack);
          } else {
            if (options["this"]) {
              thisc = options["this"].check(this, neg, pos, parents, stack);
            } else {
              thisc = this;
            }
            res = clean_rng.check(f.apply(thisc, args), pos, neg, parents, stack);
          }
          if (typeof options.post === "function" && !options.post(this)) {
            blame(neg, pos, "failed postcondition: " + options.post.toString(), "[failed postcondition]", parents);
          }
          return res;
        }