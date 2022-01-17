function(ctx, model) {
    var value = dataValue(view, ctx, model, name, macro)
      , text = typeof value === 'string' ? value
          : value == null ? ''
          : value.toString === objectToString ? JSON.stringify(value)
          : value.toString();

    // TODO: DRY. This is duplicating logic in dataValue()
    if (macro) {
      value = lookup(name.toLowerCase(), ctx.$macroCtx);
      if (typeof value === 'function' && value.unescaped) {
        return text;
      }
    }
    return escape ? escape(text) : text;
  }