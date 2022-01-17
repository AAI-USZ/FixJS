function pushVar(view, ns, stack, events, macroAttrs, remainder, match, fn) {
  var name = match.name
    , partial = match.partial
    , macro = match.macro
    , escapeFn = match.escaped && escapeHtml
    , attr, attrs, boundOut, last, tagName, wrap, render, isBlock;

  if (partial) {
    var arr = splitPartial(view, partial, ns)
      , partialNs = arr[0]
      , partialName = arr[1]
      , alias = partialNs === view._selfNs ? '' : 'self'
    render = arr[2]._find(partialName, ns, macroAttrs);
    fn = partialFn(view, arr, 'partial', alias, render, match.macroCtx, null, macroAttrs);
  }

  else if (isBound(macroAttrs, match)) {
    last = lastItem(stack);
    wrap = match.pre ||
      !last ||
      (last[0] !== 'start') ||
      isVoid(tagName = last[1]) ||
      wrapRemainder(tagName, remainder);

    if (wrap) {
      stack.push(['marker', '', attrs = {}]);
    } else {
      attrs = last[2];
      for (attr in attrs) {
        parseMarkup('boundParent', attr, tagName, events, attrs, match);
      }
      boundOut = parseMarkup('boundParent', '*', tagName, events, attrs, match);
      if (boundOut) {
        bindEventsById(events, macro, name, null, attrs, boundOut.method, boundOut.property);
      }
    }
    addId(view, attrs);

    if (!boundOut) {
      isBlock = !!match.type;
      bindEventsById(events, macro, name, fn, attrs, 'html', !fn && escapeFn, isBlock);
    }
  }

  pushVarFn(view, stack, fn, name, escapeFn, macro);
  if (wrap) {
    stack.push([
      'marker'
    , '$'
    , { id: function() { return attrs._id } }
    ]);
  }
}