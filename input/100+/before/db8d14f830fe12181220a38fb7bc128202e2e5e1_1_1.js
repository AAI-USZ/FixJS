function setColumnWidth() {
    var pdims = pageDimensions();
    var ce = columnedElement();

    p.width = pdims.width;

    var rules = Monocle.Styles.rulesToString(k.STYLE["columned"]);
    rules += Monocle.Browser.css.toCSSDeclaration('column-width', pdims.col+'px');
    rules += Monocle.Browser.css.toCSSDeclaration('column-gap', k.GAP+'px');
    rules += Monocle.Browser.css.toCSSDeclaration('transform', 'translateX(0)');

    if (Monocle.Browser.env.forceColumns && ce.scrollHeight > pdims.height) {
      rules += Monocle.Styles.rulesToString(k.STYLE['column-force']);
      if (Monocle.DEBUG) {
        console.warn("Force columns ("+ce.scrollHeight+" > "+pdims.height+")");
      }
    }

    if (ce.style.cssText != rules) {
      // Update offset because we're translating to zero.
      p.page.m.offset = 0;

      // Apply body style changes.
      ce.style.cssText = rules;

      if (Monocle.Browser.env.scrollToApplyStyle) {
        ce.scrollLeft = 0;
      }
    }
  }