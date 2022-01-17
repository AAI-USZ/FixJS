function(e) {
        if (e.target.nodeName != 'LI') {
          return;
        }
        if (self.isDisabled()) {
          return false
        }
        var children = self.$element.find('option');
        
        if (!self.multiple || !Combobox.isCTRL) {
          children.filter(':selected').attr('selected', null);
        }
        
        if (self.multiple && Combobox.isCTRL && children.get(e.target.combobox_index).selected == true) {
          children.get(e.target.combobox_index).selected = false;
        }
        else {
          children.get(e.target.combobox_index).selected = true;
        }
        
        self.$element.change();
        self.updateSelected();
        if (!self.multiple) {
          self.hide();
        }
        self.removeSelection();
      }