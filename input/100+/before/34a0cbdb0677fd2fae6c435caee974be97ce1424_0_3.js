function() {
    // Constraints for all boxes
    var ref = this.edges.ref;
    var actual = this.edges.actual;
    var containing = this.containingBlock.edges.actual;
    var constrain = this.solver.add.bind(this.solver);
    var vals = this.values;
    var vars = this.vars;

    // FIXME(slightlyoff):
    //      Need to generate different rules for %-based values!

    // Michalowski '98, Section 3.1
    
    var _mediumWidth = cv("mediumWidth", DEFULT_MEDIUM_WIDTH);

    // Content dimensions are padding plus/minus the corresponding padding.
    if (vals.padding.isAuto) {
      ref.padding = ref.content;
    } else {
      constrain(
        eq(
          ref.content._top, 
          c.Plus(ref.padding._top, vals.paddingTop.px),
          required
        ),
        eq(
          ref.content._left, 
          c.Plus(ref.padding._left, vals.paddingLeft.px),
          required
        ),
        eq(
          ref.content._right,
          c.Minus(ref.padding._right, vals.paddingRight.px),
          required
        ),
        eq(
          ref.content._bottom,
          c.Minus(ref.padding._bottom, vals.paddingBottom.px),
          required
        )
      );
    }

    if (vals.border.isAuto) {
      ref.border = ref.padding;
    } else {
      constrain(
        eq(c.Minus(ref.padding._top, vals.borderTopWidth.px),
          ref.border._top,
          required
        ),
        eq(c.Minus(ref.padding._left, vals.borderLeftWidth.px),
          ref.border._left,
          required
        ),
        eq(c.Plus(ref.padding._right, vals.borderRightWidth.px),
          ref.border._right,
          required
        ),
        eq(c.Plus(ref.padding._bottom, vals.borderBottomWidth.px),
          ref.border._bottom,
          required
        )
      );
    }

    var mt = (vals.marginTop.isAuto && !vals.webkitMarginBefore.isAuto) ?
                vals.webkitMarginBefore.px : vals.marginTop.px;

    var mr = (vals.marginRight.isAuto && !vals.webkitMarginEnd.isAuto) ?
                vals.webkitMarginEnd.px : vals.marginRight.px;

    var mb = (vals.marginBottom.isAuto && !vals.webkitMarginAfter.isAuto) ?
                vals.webkitMarginAfter.px : vals.marginBottom.px;

    var ml = (vals.marginLeft.isAuto && !vals.webkitMarginStart.isAuto) ?
                vals.webkitMarginStart.px : vals.marginLeft.px;

    constrain(
      eq(c.Minus(ref.border._top, mt),
        ref.margin._top,
        required
      ),
      eq(c.Minus(ref.border._left, ml),
        ref.margin._left,
        required
      ),
      eq(c.Plus(ref.border._right, mr),
        ref.margin._right,
        required
      ),
      eq(c.Plus(ref.border._bottom, mb),
        ref.margin._bottom,
        required
      )
    );

    // FIXME: if %-valued, need to do the obvious thing
    if (!vals.width.isAuto) {
      constrain(
        eq(c.Plus(ref.content._left, vals.width.px),
          ref.content._right,
          required
        )
      );
    }

    if (!vals.height.isAuto) {
      constrain(
        eq(c.Plus(ref.content._top, vals.height.px),
          ref.content._bottom,
          required
        )
      );
    }


    // Width and height are the result of:
    //  w = right - left;
    //  h = bottom - top;
    constrain(
      eq(
        vars.width,
        c.Minus(ref.border._right, ref.border._left),
        medium
      ),
      eq(
        vars.height,
        c.Minus(ref.border._bottom, ref.border._top),
        medium
      )
    );

    /*
    console.log("Generating for: " + this);
    console.log(" -- naturalSize:", "width:", this.naturalSize.width, "height:", this.naturalSize.height);
    */

    constrain(eq(vars.width, this.naturalSize.width, weak));

    if (!vals.width.isAuto) {
      // console.log(" -- using specified size:", vals.width.px);
      constrain(eq(vars.width, vals.width.px, strong));
    }

    constrain(eq(vars.height, this.naturalSize.height, weak));

    if (!vals.height.isAuto) {
      constrain(eq(vars.height, vals.height.px, strong));
    }

    [
      vars.marginTop,
      vars.marginRight,
      vars.marginBottom,
      vars.marginLeft,
      vars.paddingTop,
      vars.paddingRight,
      vars.paddingBottom,
      vars.paddingLeft
    ].forEach(function(v) { constrain(eq(v, 0, weak)); });

    [
      vars.borderTop,
      vars.borderRight,
      vars.borderBottom,
      vars.borderLeft
    ].forEach(function(v) { constrain(eq(v, _mediumWidth, weak)); }); 


    if (vals.position == "relative") {
      // Only do this when they could possibly differ.
      ["margin", "border", "padding", "content"].forEach(function(type) {
        ["_left", "_top", "_right", "_bottom"].forEach(function(name) {
          // FIXME(slightlyoff): unsure how to make ref's variables read-only here!
          constrain(
            eq(actual[type][name], ref[type][name], strong)
          );
        });
      });
    } else {
      this.edges.actual = this.edges.ref;
      actual = ref;
    }

    constrain(
      geq(vars.width, 0, required),
      geq(vars.height, 0, required)
    );

    // RENDER DEBUGGING ONLY:
    /*
    constrain(
      eq(vars.minWidth, 10, strong),
      eq(vars.minHeight, 30, strong)
    );
    */
    if (!vals.minWidth.isAuto) {
      constrain(
        geq(vars.width, vars.minWidth, required)
      );
    }

    if (!vals.minHeight.isAuto) {
      constrain(
        geq(vars.height, vars.minHeight, required)
      );
    }

    constrain(
      eq(vars.left, 0, weak),
      eq(vars.right, 0, weak),
      eq(vars.top, 0, weak),
      eq(vars.bottom, 0, weak)
    );

    // FIXME(slightlyoff):
    //  Missing 9.5 items for floated boxes

    // Michalowski '98, Section 3.3
    // Normally-positioned Block boxes are handed in flow()
    
    // Michalowski '98, Section 3.4
    // Position-based Constraints
    //
    // TODO(slightlyoff)
    //
    var posRefBox;
    if (vals.position == "relative") {
      posRefBox = ref;
    } else if(
      vals.position == "absolute" ||
      vals.position == "fixed"
    ) {
      posRefBox = containing;
    }

    if (posRefBox) {
      // TODO: tersify and add similar % support in other places.
      if (!vals.top.isAuto) {
        var topExpr;
        if (vals.top.isPct) {
          topExpr = c.Plus(posRefBox.margin._top, 
                           c.Times(
                             c.Minus(posRefBox.border._bottom, posRefBox.border._top),
                             vals.top.pct/100
                           )
                     );
        } else {
          topExpr = c.Plus(posRefBox.margin._top, vals.top.px);
        }
        constrain(eq(actual.border._top, topExpr, required));
      }

      if (!vals.left.isAuto) {
        var leftExpr;
        if (vals.left.isPct) {
          leftExpr = c.Plus(posRefBox.margin._left, 
                            c.Times(
                              c.Minus(posRefBox.border._right, posRefBox.border._left),
                              vals.left.pct/100
                            )
                     );
        } else {
          leftExpr = c.Plus(posRefBox.margin._left, vals.left.px);
        }
        constrain(eq(actual.border._left, leftExpr, required));
      }

      if (!vals.right.isAuto) {
        var rightExpr;
        if (vals.right.isPct) {
          rightExpr = c.Minus(posRefBox.margin._right, 
                              c.Times(
                                c.Minus(posRefBox.border._right, posRefBox.border._left),
                                vals.right.pct/100
                              )
                       );
        } else {
          rightExpr = c.Minus(posRefBox.content._right, vals.right.px);
        }
        constrain(eq(actual.border._right, rightExpr, required));
      }

      if (!vals.bottom.isAuto) {
        var bottomExpr;
        if (vals.bottom.isPct) {
          bottomExpr = c.Minus(posRefBox.margin._bottom, 
                               c.Times(
                                 c.Minus(posRefBox.border._bottom, posRefBox.border._top),
                                 vals.bottom.pct/100
                               )
                       );
        } else {
          bottomExpr = c.Minus(posRefBox.margin._bottom, vals.bottom.px);
        }
        constrain(eq(actual.border._bottom, bottomExpr, required));
      }
    }

    //
    // TODO(slightlyoff)
    //
  }