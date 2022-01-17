function(toolbar) {
        var buttonize, buttonset,
          _this = this;
        buttonset = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        buttonize = function(type, label) {
          var buttonElement;
          buttonElement = jQuery('<span></span>');
          buttonElement.hallobutton({
            uuid: _this.options.uuid,
            editable: _this.options.editable,
            label: label,
            command: "insert" + type + "List",
            icon: "icon-list-" + (label.toLowerCase()),
            cssClass: _this.options.buttonCssClass
          });
          return buttonset.append(buttonElement);
        };
        if (this.options.lists.ordered) {
          buttonize("Ordered", "OL");
        }
        if (this.options.lists.unordered) {
          buttonize("Unordered", "UL");
        }
        buttonset.hallobuttonset();
        return toolbar.append(buttonset);
      }