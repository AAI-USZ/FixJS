function(data) {
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

      can_load_new_mapping = true;
      $('.buttons form').attr('action', '/reviews/' + data.id);
      $('.buttons input').removeAttr('disabled');
    }