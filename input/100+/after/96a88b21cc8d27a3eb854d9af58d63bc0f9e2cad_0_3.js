function (component, selection) {

        var
          graph = component.api.flotr,
          axes = graph.axes,
          data = selection.data || {},
          options = {},
          x = selection.x,
          y = selection.y;

        if (!x && data.x) {
          // Translate data to pixels
          x = data.x;
          options.x1 = x.min;
          options.x2 = x.max;
        } else if (x) {
          // Use pixels
          options.x1 = axes.x.p2d(x.min);
          options.x2 = axes.x.p2d(x.max);
        }

        if (!y && data.y) {
          // Translate data to pixels
          y = data.y;
          options.y1 = y.min;
          options.y2 = y.max;
        } else if (y) {
          // Use pixels
          options.y1 = axes.y.d2p(y.min);
          options.y2 = axes.y.d2p(y.max);
        }

        graph.selection.setSelection(options);
      }