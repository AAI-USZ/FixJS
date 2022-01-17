function maybeAddCommand(model) {

    /* We will add a default command if the user did not. */
    var hasCommand = false;

    /* Now we can assign the name the user wanted. */
    Object.keys(model).forEach(function (v) {
      var value = model[v];

      if (hd.isProxy(value)) {
        var vv = value.unwrap();

        if (vv.cellType === "output") {
          hasCommand = true;
        }

        vv.id = v;
        if (vv.inner) {
          var ccStay = vv.inner.stayConstraint.outer;
          ccStay.id = vv.id + "_stay";
          var mmStay = ccStay.methods[0];
          mmStay.id = vv.id + "_const";
        }
      }
    });

    /* The default output variable will access every variable so that they are
     * all relevant. It will not be visible to users. */
    if (!hasCommand) {
      hd.command(sink);
    }

  }