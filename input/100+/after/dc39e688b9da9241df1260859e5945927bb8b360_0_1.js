function initialize_invitation_form(locale, rails_env) {
  // Focus triggering causes a recursion in Firefox in tests,
  // so skipping it in test environment
  if (rails_env == "test") {
    $('div.invitation_form_hidden_parts').slideDown('fast');
  } else {
    $('#invitation_email').focus(function() {
      $('div.invitation_form_hidden_parts').slideDown('fast');
      $(document).bind('focusin.invitation_form_hidden_parts click.invitation_form_hidden_parts',function(e) {
        if ($(e.target).closest('.invitation_form_hidden_parts, #invitation_email').length) return;
        $(document).unbind('.example');
        $('div.invitation_form_hidden_parts').slideUp('fast');
      });
    });
    $('div.invitation_form_hidden_parts').slideUp('fast');
  }
  auto_resize_text_areas();
  prepare_ajax_form(
    "#new_invitation",
    locale, 
    {
      "invitation[email]": {required: true, email: true},
      "invitation[message]": {required: false, maxlength: 5000}
    }
  );
}