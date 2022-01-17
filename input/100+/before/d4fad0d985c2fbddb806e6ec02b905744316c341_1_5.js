function(toolbar) {
        var buttonize, buttonset,
          _this = this;
        buttonset = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        buttonize = function(alignment) {
          var buttonElement;
          buttonElement = jQuery('<span></span>');
          buttonElement.hallobutton({
            uuid: _this.options.uuid,
            editable: _this.options.editable,
            label: alignment,
            command: "justify" + alignment,
            icon: "icon-align-" + (alignment.toLowerCase()),
            cssClass: _this.options.buttonCssClass
          });
          return buttonset.append(buttonElement);
        };
        buttonize("Left");
        buttonize("Center");
        buttonize("Right");
        buttonset.buttonset();
        return toolbar.append(buttonset);
      }