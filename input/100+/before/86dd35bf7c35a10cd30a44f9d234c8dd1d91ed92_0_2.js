function(data) {
      switch (data.status) {
        case 301:
          mapping_result = "→ <a href='" + data.new_url + "' target='blank'>" + data.new_url + "</a>";
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
        $('.buttons button[name="'+ data.result +'"]').addClass('selected');
      }

      $('#mapping_title a').text(data.title).attr('href', data.old_url);
      $('#mapping_result').html(mapping_result);
      $('#mapping_old_page').attr('src', data.old_url);
      $('#mapping_new_page').attr('src', new_page_src);

      history.pushState( { mapping_id: data.id }, '', '/browse/' + data.id );

      $('.user_score').text( parseInt( $('.user_score').text() ) + 1 );

      can_load_new_mapping = true;
      $('.buttons form').attr('action', '/reviews/' + data.id);
      $('.buttons button').removeAttr('disabled');
    }