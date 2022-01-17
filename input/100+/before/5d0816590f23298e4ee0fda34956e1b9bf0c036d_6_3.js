function changeSelectedMethod(ccc, mmNew)
  {
    var mmOld = ccc.outer.selectedMethod;
    if (mmOld) {
      mmOld.isSelected = false;
      mmOld.outputs.forEach(function (ww) {
        ww.inner.determinedBy = null;
        ww.writtenBy = null;
      }, this);
    }

    if (mmNew) {
      mmNew.isSelected = true;
      mmNew.outputs.forEach(function (ww) {
        /* The output variables' determinedBy fields must be set so that
         * collectUpstreamConstraints can perform its reverse depth-first
         * search. */
        ww.inner.determinedBy = ccc;
        if (ccc.isRequired()) {
          ww.writtenBy = mmNew;
        }
      }, this);
    }

    ccc.outer.selectedMethod = mmNew;

    LOG("        changing method for " + ccc +
        " to " + (mmNew ? mmNew : "(nothing)") +
        " from " + (mmOld ? mmOld : "(nothing)"));
  }