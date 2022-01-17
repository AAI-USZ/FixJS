function(Presentation) {
      Presentation.initInstance = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return MITHGrid.initInstance.apply(MITHGrid, ["MITHGrid.Presentation"].concat(__slice.call(args), [function(that, container) {
          var activeRenderingId, lensKeyExpression, lenses, options, renderings;
          activeRenderingId = null;
          renderings = {};
          lenses = that.options.lenses || {};
          options = that.options;
          $(container).empty();
          lensKeyExpression = void 0;
          options.lensKey || (options.lensKey = ['.type']);
          that.getLens = function(id) {
            var key, keys;
            if (lensKeyExpression != null) {
              keys = lensKeyExpression.evaluate([id]);
              key = keys[0];
            }
            if ((key != null) && (lenses[key] != null)) {
              return {
                render: lenses[key]
              };
            }
          };
          that.addLens = function(key, lens) {
            lenses[key] = lens;
            return that.selfRender();
          };
          that.removeLens = function(key) {
            return delete lenses[key];
          };
          that.hasLens = function(key) {
            return lenses[key] != null;
          };
          that.visitRenderings = function(cb) {
            var id, r;
            for (id in renderings) {
              r = renderings[id];
              if (false === cb(id, r)) return;
            }
          };
          that.renderingFor = function(id) {
            return renderings[id];
          };
          that.renderItems = function(model, items) {
            var f, n, step;
            if (!(lensKeyExpression != null)) {
              lensKeyExpression = model.prepare(options.lensKey);
            }
            n = items.length;
            step = n;
            if (step > 200) step = parseInt(Math.sqrt(step), 10) + 1;
            if (step < 1) step = 1;
            f = function(start) {
              var end, hasItem, i, id, rendering;
              if (start < n) {
                end = start + step;
                if (end > n) end = n;
                for (i = start; start <= end ? i < end : i > end; start <= end ? i++ : i--) {
                  id = items[i];
                  hasItem = model.contains(id) && that.hasLensFor(id);
                  if (renderings[id] != null) {
                    if (!hasItem) {
                      if (activeRenderingId === id && (renderings[id].eventUnfocus != null)) {
                        renderings[id].eventUnfocus();
                      }
                      if (renderings[id].remove != null) renderings[id].remove();
                      delete renderings[id];
                    } else {
                      renderings[id].update(model.getItem(id));
                    }
                  } else if (hasItem) {
                    rendering = that.render(container, model, id);
                    if (rendering != null) {
                      renderings[id] = rendering;
                      if (activeRenderingId === id && (rendering.eventFocus != null)) {
                        rendering.eventFocus();
                      }
                    }
                  }
                }
                return setTimeout(function() {
                  return f(end);
                }, 0);
              } else {
                return that.finishDisplayUpdate();
              }
            };
            that.startDisplayUpdate();
            return f(0);
          };
          that.render = function(c, m, i) {
            var lens;
            lens = that.getLens(i);
            if (lens != null) return lens.render(c, that, m, i);
          };
          that.hasLensFor = function(id) {
            var lens;
            lens = that.getLens(id);
            return lens != null;
          };
          that.eventModelChange = that.renderItems;
          that.startDisplayUpdate = function() {};
          that.finishDisplayUpdate = function() {};
          that.selfRender = function() {
            return that.renderItems(that.dataView, that.dataView.items());
          };
          that.eventFocusChange = function(id) {
            var rendering;
            if (activeRenderingId != null) {
              rendering = that.renderingFor(activeRenderingId);
            }
            if (activeRenderingId !== id) {
              if ((rendering != null) && (rendering.eventUnfocus != null)) {
                rendering.eventUnfocus();
              }
              if (id != null) {
                rendering = that.renderingFor(id);
                if ((rendering != null) && (rendering.eventFocus != null)) {
                  rendering.eventFocus();
                }
              }
              activeRenderingId = id;
            }
            return activeRenderingId;
          };
          that.getFocusedRendering = function() {
            if (activeRenderingId != null) {
              return that.renderingFor(activeRenderingId);
            } else {
              return null;
            }
          };
          that.dataView = that.options.dataView;
          return that.dataView.registerPresentation(that);
        }]));
      };
      return Presentation.namespace("SimpleText", function(SimpleText) {
        return SimpleText.initInstance = function() {
          var args, _ref3;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return (_ref3 = MITHGrid.Presentation).initInstance.apply(_ref3, ["MITHGrid.Presentation.SimpleText"].concat(__slice.call(args), [function(that, container) {}]));
        };
      });
    }