function initialize_new_tribe_form(locale, invalid_domain_message, domain_in_use_message, select_default) {
  auto_resize_text_areas();
  $('select.community_language_select').selectmenu({width: "540px", maxHeight: 175, style: 'dropdown'});
  //Remove unnecessary default option from the select tribe language menu
  if ($('a:contains("' + select_default + '")').eq(1).length < 1) {
    $('a:contains("' + select_default + '")').parent().remove();
  } else {
    $('a:contains("' + select_default + '")').eq(1).parent().remove();
  }
  $('input.text_field:first').focus();
  $('#terms_link').click(function() { $('#terms').lightbox_me({centered: true}); });
	$("input[type=checkbox]").uniform();
  var form_id = "#new_community"
  $(form_id).validate({
    errorPlacement: function(error, element) {
			if (element.attr("name") == "community[domain]") {
				error.appendTo(element.parent());
			} else if (element.attr("name") == "community[terms]") {
  				error.appendTo(element.parent().parent().parent().parent().parent());
			} else {
			  error.insertAfter(element);
			}
		},
		rules: {
			"community[name]": {required: true, minlength: 2, maxlength: 50},
			"community[domain]": {required: true, minlength: 2, maxlength: 50, valid_domain: true, remote: "/tribes/check_domain_availability"},
			"community[slogan]": {required: true, minlength: 2, maxlength: 100},
			"community[description]": {required: true, minlength: 2, maxlength: 500},
			"community[address]": {required: true, address_validator: true},
			"community[terms]": "required"
		},
		messages: {
			"community[domain]": { valid_domain: invalid_domain_message, remote: domain_in_use_message },
		},
		submitHandler: function(form) {
		  disable_and_submit(form_id, form, "false", locale);
		}
	});
}