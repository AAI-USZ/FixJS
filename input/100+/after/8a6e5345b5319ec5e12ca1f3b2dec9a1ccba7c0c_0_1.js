function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.boxshadow");

        var shadow = "tooltip-error";
        if (useCSS) {
           shadow += "-css";
        }
        if (states.placementLeft) {
          shadow += "-left";
        }

        var decorator = "tooltip-error-arrow";
        if (states.placementLeft) {
          decorator = "tooltip-error-arrow-left";
          if (useCSS) {
            decorator += "-css";
          }
        }

        // padding
        if (useCSS) {
          if (states.placementLeft) {
            var padding = [9, 20, 3, 6];
          } else {
            var padding = [6, 6, 7, -8];
          }
        } else {
          if (states.placementLeft) {
            var padding = [6, 20, 3, 4];
          } else {
            var padding = [6, 10, 6, -10];
          }
        }

        // disable the right arrow in case of non CSS and alpah image loader
        if (
          !useCSS &&
          states.placementLeft &&
          qx.core.Environment.get("engine.name") == "mshtml" &&
          qx.core.Environment.get("browser.documentmode") < 9
        ) {
          decorator = undefined;
          padding = [5, 10];
        }

        return {
          textColor: "text-selected",
          backgroundColor : undefined,
          placeMethod: "widget",
          offset: [0, 14, 0, 14],
          marginTop: -2,
          position: "right-top",
          showTimeout: 100,
          hideTimeout: 10000,
          shadow: shadow,
          decorator: decorator,
          font: "bold",
          padding: padding,
          maxWidth: 333
        };
      }