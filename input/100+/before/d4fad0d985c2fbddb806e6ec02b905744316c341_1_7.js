function() {
        var editableElement, queryState,
          _this = this;
        if (!this.button) {
          this.button = this._prepareButton();
        }
        this.element.append(this.button);
        if (this.options.command) {
          this.button.bind('change', function(event) {
            return _this.options.editable.execute(_this.options.command);
          });
        }
        if (!this.options.queryState) {
          return;
        }
        editableElement = this.options.editable.element;
        queryState = function(event) {
          if (!_this.options.command) {
            return;
          }
          try {
            return _this.checked(document.queryCommandState(_this.options.command));
          } catch (e) {

          }
        };
        editableElement.bind('keyup paste change mouseup hallomodified', queryState);
        editableElement.bind('halloenabled', function() {
          return editableElement.bind('keyup paste change mouseup hallomodified', queryState);
        });
        return editableElement.bind('hallodisabled', function() {
          return editableElement.unbind('keyup paste change mouseup hallomodified', queryState);
        });
      }