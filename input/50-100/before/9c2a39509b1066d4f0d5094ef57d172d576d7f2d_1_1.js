function (event, options) {
              if (options.entityElement.get(0) !== element) {
                // Propagated event from another entity, ignore
                return;
              }

              // Highlight the editable
              options.element.effect('highlight', {
                color: widget.options.highlightColor
              }, 3000);
            }