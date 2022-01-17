function() {
  // check availability of list name
  $("#list_name").change(function() {
    $.ajax({url: '/admin/check_list_availability',
      data: 'name=' + this.value,
      "success": switchboard.check_list_name_ok
      });
  });

  // toggle welcome message textarea
  $('#list_use_welcome_message').change(function() {
    $('#welcome_message').toggle();
  });
}