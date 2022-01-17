function(el, prop)
        {
          try
          {
            if (!el) {
              return null;
            }

            if (el.parentNode && el.currentStyle) {
              return el.currentStyle[prop];
            }
            else
            {
              var v1 = el.runtimeStyle[prop];

              if (v1 != null && typeof v1 != "undefined" && v1 !== "") {
                return v1;
              }

              return el.style[prop];
            }
          }
          catch(ex)
          {
            throw new Error("Could not evaluate computed style: " + el + "[" + prop + "]: " + ex);
          }
        }