function() {
      var that = this,
        output = '<form class="form_in_place" action="javascript:void(0)" style="display:inline;">';
      output += '<input type="text" name="'+ this.attributeName + '" value="' + this.sanitizeValue(this.display_value) + '"';
      if (this.inner_class !== null) {
        output += ' class="' + this.inner_class + '"';
      }
      output += '></form>';
      this.element.html(output);
      this.setHtmlAttributes();
      this.element.find('input')[0].select();
      this.element.find("form").bind('submit', {editor: this}, BestInPlaceEditor.forms.input.submitHandler);
      this.element.find("input").bind('keyup', {editor: this}, BestInPlaceEditor.forms.input.keyupHandler);
      if (this.always_display_edit == true) {
        this.element.find('input')
          .datepicker({
              onClose: function() {
                that.update();
              }
            });
      } else {
        this.element.find('input')
          .datepicker({
              onClose: function() {
                that.update();
              }
            })
          .datepicker('show');

      }
    }