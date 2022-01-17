function (vv) {
      LOG(vv + " is " + ((vv.solver) ? ("") : ("not ")) +
          "attached to multi-way constraints");

      if (vv.solver) {
        var changes = vv.solver.solve();
        if (changes) {
          Array.prototype.push.apply(newMethods, changes.added);

          changes.removed.forEach(function (mm) {
            mm.outputs.forEach(function (ww) {
              ww.dependsOnSelf = false;
            });
            /* TODO: Clear `usedBy`/`inputsUsed` connections as well? */
          });
        }
      }

      var mm = vv.writtenBy;
      if (mm && vv.dependsOnSelf) {
        newMethods.setInsert(mm);
      }
    }