function() {
    $.ajax({url: '/admin/check_list_availability',
      data: 'name=' + this.value,
      "success": switchboard.check_list_name_ok
      });
  }