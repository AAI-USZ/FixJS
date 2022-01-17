function(ctx, model, triggerPath, triggerId, value, index, listener) {
      var renderMacroCtx = Object.create(macroCtx)
        , parentMacroCtx = ctx.$macroCtx
        , renderCtx, key, val, scope, out, hasScope;

      for (key in macroCtx) {
        val = macroCtx[key];
        if (val && val.$macroName) {
          val = renderMacroCtx[key] = parentMacroCtx[val.$macroName];
        }
        if (val && val.$matchName) {
          val = renderMacroCtx[key] = Object.create(val)
          val.$matchName = ctxPath(ctx, val.$matchName)
        }
      }
      if (alias) {
        scope = '_$component.' + model.id();
        renderCtx = extendCtx(ctx, null, scope, alias, null, false, macro);
        renderCtx.$startIndex = ctx.$indices.length;
        hasScope = createComponent(view, model, name[0], name[1], scope, renderCtx, renderMacroCtx, macroAttrs);
      } else {
        renderCtx = Object.create(ctx);
      }
      renderCtx.$macroCtx = renderMacroCtx;

      out = render(renderCtx, model, triggerPath);
      if (hasScope) model.__fnCtx = model.__fnCtx.slice(0, -1);
      return out;
    }