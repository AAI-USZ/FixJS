function initialize_homepage() {
  $('#invitation_email').focus(function() {
    $('div.invitation_form_hidden_parts').slideDown('fast');
    $(document).bind('focusin.invitation_form_hidden_parts click.invitation_form_hidden_parts',function(e) {
      if ($(e.target).closest('.invitation_form_hidden_parts, #invitation_email').length) return;
      $(document).unbind('.example');
      $('div.invitation_form_hidden_parts').slideUp('fast');
    });
  });
  $('div.invitation_form_hidden_parts').slideUp('fast');
  $('#poll_answer_poll_option_id_value15').focus(function() {
    alert("Focus here!");
    // $('div.invitation_form_hidden_parts').slideDown('fast');
    // $(document).bind('focusin.poll_form_hidden_parts click.poll_form_hidden_parts',function(e) {
    //   if ($(e.target).closest('.poll_form_hidden_parts, .poll_answer[poll_option_id]').length) return;
    //   $(document).unbind('.example');
    //   $('div.poll_form_hidden_parts').slideUp('fast');
    // });
  });
  $('div.poll_form_hidden_parts').slideUp('fast');
  $("input[type=radio]").uniform();
  auto_resize_text_areas();
  var form_id = "#new_invitation"
	$(form_id).validate({
		rules: {
		  "invitation[email]": {required: true, email: true},
			"invitation[message]": {required: false, maxlength: 5000}
		},
		submitHandler: function(form) {
		  disable_and_submit(form_id, form, "true", locale);
		}
	});
}