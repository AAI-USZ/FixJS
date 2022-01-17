function(forms) {
    var self = this;
    self.showFormList();
    self.hideContentArea();

    var form_list = jQuery('#fh_wufoo_form_list');
    // Render buttons for each form
    for (var i = 0; i < forms.length; i++) {
      var form_item = forms[i];
      var list_item = jQuery('<li>').addClass('fh_wufoo_form_li');
      var item_button = jQuery('<button>').addClass('fh_wufoo_form').text(form_item.Name).data('form', form_item).click(function() {
        var form_data = jQuery(this).data('form');
        self.getForm(form_data.Hash);
      });
      list_item.append(item_button);
      form_list.append(list_item);
    }
  }