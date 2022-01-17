function(ctx, model) {
    var value = dataValue(view, ctx, model, name, macro)
      , text = valueText(value);

    // TODO: DRY. This is duplicating logic in dataValue()
    if (macro) {
      value = lookup(name.toLowerCase(), ctx.$macroCtx);
      if (typeof value === 'function' && value.unescaped) {
        return text;
      }
    }
    return escape ? escape(text) : text;
  }