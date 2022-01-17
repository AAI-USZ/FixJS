function() {
        var $button, data, title;
        $button = jQuery(this);
        if ($button.hasClass('inactive')) {
          return false;
        }
        title = $createInput.val();
        if (title === '') {
          $createInput.focus();
          return false;
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
        return false;
      }