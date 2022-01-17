function() {
  $('#overlay').hide();

  var can_load_new_mapping = true;

  $('.browser .buttons input').click(function(e) {
    e.preventDefault();

    var form_path = $(this).parent('form').attr('action');
    var all_buttons = $(this).parent('form').find('input');
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
  });

  window.onpopstate = function(event) {
    if (event.state && event.state.mapping_id !== undefined) {
      load_mapping(event.state.mapping_id);
    }
  };

  function load_new_mapping() {
    $.getJSON('/browse.json', function(data) {
      load_mapping(data.next_mapping_id);
    });
  }

  function load_mapping(id) {
    $('#overlay').fadeIn('fast');

    $.getJSON('/browse/'+ id +'.json', function(data) {
      switch (data.status) {
        case 301:
          mapping_result = "→ " + data.new_url;
          new_page_src = data.new_url;
          break;
        case 410:
          mapping_result = "→ Gone";
          new_page_src = '/browser/410.html';
          break;
        default:
          mapping_result = "None";
          new_page_src = '/browser/no_status.html';
      }

      if (data.result !== null) {
        $('.buttons input[name="'+ data.result +'"]').addClass('selected');
      }

      $('#mapping_title').text(data.title);
      $('#mapping_result').text(mapping_result);
      $('#mapping_old_page').attr('src', data.old_url);
      $('#mapping_new_page').attr('src', new_page_src);

      history.pushState( { mapping_id: data.id }, '', '/browse/' + data.id );

      $('.user_score').text( parseInt( $('.user_score').text() ) + 1 );

      can_load_new_mapping = true;
      $('.buttons form').attr('action', '/reviews/' + data.id);
      $('.buttons input').removeAttr('disabled');
    });

    $('#mapping_old_page').load( function(){
      $('.buttons').removeClass('disabled');
      $('#overlay').fadeOut('fast');
    });
  }
}