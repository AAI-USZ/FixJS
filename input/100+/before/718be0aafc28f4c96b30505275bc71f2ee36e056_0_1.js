function(res) {
      $('#new').text(res.responseText);
      $('#primary_tab').click();
      set_edit_mode($('.template_text'));
      var time = $(item).closest('div.row').find('h6 span').attr('data-original-title');
      $('#config_template_audit_comment').text("Revert to revision from: " + time)
    }