function() {
  var form = $('form#new_user'), password = form.find('input#user_password'), confirmation = form.find('input#user_password_confirmation');
  var label = $('label[for="user_password"]');

  password.val('password');
  confirmation.trigger('focusout');
  ok(password.parent().hasClass('field_with_errors'));
  ok(label.parent().hasClass('field_with_errors'));
}