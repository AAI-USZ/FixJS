function() {
    $('div.invitation_form_hidden_parts').slideDown('fast');
    $(document).bind('focusin.invitation_form_hidden_parts click.invitation_form_hidden_parts',function(e) {
      if ($(e.target).closest('.invitation_form_hidden_parts, #invitation_email').length) return;
      $(document).unbind('.example');
      $('div.invitation_form_hidden_parts').slideUp('fast');
    });
  }