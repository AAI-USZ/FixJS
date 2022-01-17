function(res) {
      $('#primary_tab').click();
      if ($.browser.msie && $.browser.version.slice(0,1) < 10){
        $('.template_text').val(res.responseText);
      } else {
        $('#new').text(res.responseText);
        set_edit_mode($('.template_text'));
      }
      var time = $(item).closest('div.row').find('h6 span').attr('data-original-title');
      $('#config_template_audit_comment').text("Revert to revision from: " + time)
    }