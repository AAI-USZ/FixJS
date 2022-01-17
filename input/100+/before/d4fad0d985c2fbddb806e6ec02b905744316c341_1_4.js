function(toolbar) {
        var buttonize, buttonset,
          _this = this;
        buttonset = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        buttonize = function(cmd, label) {
          var buttonElement;
          buttonElement = jQuery('<span></span>');
          buttonElement.hallobutton({
            uuid: _this.options.uuid,
            editable: _this.options.editable,
            label: label,
            icon: cmd === 'undo' ? 'icon-undo' : 'icon-repeat',
            command: cmd,
            queryState: false,
            cssClass: _this.options.buttonCssClass
          });
          return buttonset.append(buttonElement);
        };
        buttonize("undo", "Undo");
        buttonize("redo", "Redo");
        buttonset.buttonset();
        return toolbar.append(buttonset);
      }