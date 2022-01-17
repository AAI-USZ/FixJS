function(e) {
    e.preventDefault();

    var form_path = $(this).parent('form').attr('action');
    var all_buttons = $(this).parent('form').find('button');
    var button = $(this);

    $.ajax({
      type: "PUT",
      url: form_path,
      data: { result: $(this).attr('name') },
      success: function(data) {
        all_buttons.removeClass('selected');
        if (can_load_new_mapping == true) {
          load_new_mapping();
        }
      },
      error: function(data) {
        all_buttons.removeAttr('disabled').removeClass('selected');
        $('.buttons').removeClass('disabled');

        alert("An error occurred whilst trying to save your review. Please reload the page and try again.");
        window.location = window.location;
      },
      beforeSend: function(data) {
        $('.buttons').addClass('disabled');
        all_buttons.attr('disabled',true).removeClass('selected');
        button.addClass('selected');
      }
    });
  }