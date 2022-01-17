function makeStylesExplicit(wrapperElem, css) {
  var stylesheet, rule, selectorMatches, i, j, styleAttr;

  stylesheet = getMarkdownStylesheet(wrapperElem, css);

  for (i = 0; i < stylesheet.cssRules.length; i++) {
    rule = stylesheet.cssRules[i];

    // Special case for the selector: If the selector is '.markdown-here-wrapper',
    // then we want to apply the rules to the wrapper (not just to its ancestors,
    // which is what querySelectorAll gives us).
    // Note that the CSS should not have any rules that use "body" or "html".

    if (rule.selectorText === '.markdown-here-wrapper') {
      wrapperElem.setAttribute('style', rule.style.cssText);
    }
    else {
      selectorMatches = wrapperElem.querySelectorAll(rule.selectorText);
      for (j = 0; j < selectorMatches.length; j++) {
        styleAttr = selectorMatches[j].getAttribute('style') || '';
        styleAttr += rule.style.cssText;
        selectorMatches[j].setAttribute('style', styleAttr);
      }
    }
  }
}