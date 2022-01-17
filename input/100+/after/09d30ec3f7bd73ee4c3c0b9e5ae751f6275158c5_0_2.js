function(ev) {
        var $button, data, title;
        ev.preventDefault();
        $button = jQuery(this);
        if ($button.hasClass('inactive')) {
          return;
        }
        title = $createInput.val();
        if (title === '') {
          $createInput.focus();
          return;
        }
        $button.addClass('inactive');
        data = {
          subaction: 'create_post',
          post_title: title
        };
        ajax_request(data, function(response) {
          append_connection(response);
          $createInput.val('');
          return $button.removeClass('inactive');
        });
        return null;
      }