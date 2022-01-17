function () {
      this._setOption('state', 'edit');
      var widget = this;
      var editableOptions = {
        toolbarState: widget.options.display,
        disabled: false,
        vie: widget.vie,
        widgets: widget.options.editorWidgets,
        editorOptions: widget.options.editorOptions
      };
      if (widget.options.enableEditor) {
        editableOptions[enableEditor] = widget.options.enableEditor;
      }
      if (widget.options.disableEditor) {
        editableOptions[disableEditor] = widget.options.disableEditor;
      }
      jQuery('[about]', this.element).each(function () {
        var element = this;
        if (widget.options.highlight) {
          var highlightEditable = function (event, options) {
              if (!jQuery(options.element).is(':visible')) {
                // Hidden element, don't highlight
                return;
              }
              if (options.entityElement.get(0) !== element) {
                // Propagated event from another entity, ignore
                return;
              }

              // Highlight the editable
              options.element.effect('highlight', {
                color: widget.options.highlightColor
              }, 3000);
            };

          jQuery(this).bind('midgardeditableenableproperty', highlightEditable);
        }
        jQuery(this).bind('midgardeditabledisable', function () {
          jQuery(this).unbind('midgardeditableenableproperty', highlightEditable);
        });

        if (widget.options.tags) {
          jQuery(this).bind('midgardeditableenable', function (event, options) {
            jQuery(this).midgardTags({
              vie: widget.vie,
              entityElement: options.entityElement,
              entity: options.instance
            });
          });
        }

        jQuery(this).midgardEditable(editableOptions);
      });

      this._trigger('statechange', null, {
        state: 'edit'
      });
    }