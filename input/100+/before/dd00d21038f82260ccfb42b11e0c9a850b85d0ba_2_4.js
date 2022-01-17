function(element, name, mode, smart)
      {
        // normalize name
        name = this.__styleNames[name] || this.__getStyleName(name) || name;

        // special handling
        if (smart!==false && this.__special[name]) {
          return this.__special[name].get(element, mode);
        }

        // if the element is not inserted into the document "currentStyle"
        // may be undefined. In this case always return the local style.
        if (!element.currentStyle) {
          return element.style[name] || "";
        }

        // switch to right mode
        switch(mode)
        {
          case this.LOCAL_MODE:
            return element.style[name] || "";

          case this.CASCADED_MODE:
            return element.currentStyle[name] || "";

          default:
            // Read cascaded style
            var currentStyle = element.currentStyle[name] || "";

            // Pixel values are always OK
            if (/^-?[\.\d]+(px)?$/i.test(currentStyle)) {
              return currentStyle;
            }

            // Try to convert non-pixel values
            var pixel = this.__mshtmlPixel[name];
            if (pixel)
            {
              // Backup local and runtime style
              var localStyle = element.style[name];

              // Overwrite local value with cascaded value
              // This is needed to have the pixel value setupped
              element.style[name] = currentStyle || 0;

              // Read pixel value and add "px"
              var value = element.style[pixel] + "px";

              // Recover old local value
              element.style[name] = localStyle;

              // Return value
              return value;
            }

            // Non-Pixel values may be problematic
            if (/^-?[\.\d]+(em|pt|%)?$/i.test(currentStyle)) {
              throw new Error("Untranslated computed property value: " + name + ". Only pixel values work well across different clients.");
            }

            // Just the current style
            return currentStyle;
        }
      }