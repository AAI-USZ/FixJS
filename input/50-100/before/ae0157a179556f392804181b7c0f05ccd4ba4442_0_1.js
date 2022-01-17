function() {
    $('#edit_descriptions_link').attr('class', '');
    $('#edit_versioning_link').attr('class', 'active');
    $('#edit_permissions_link').attr('class', '');

    $('#descriptions_display').hide();
    $('#versioning_display').show();
    $('#permissions_display').hide();
    $('#permissions_submit').hide();
  }