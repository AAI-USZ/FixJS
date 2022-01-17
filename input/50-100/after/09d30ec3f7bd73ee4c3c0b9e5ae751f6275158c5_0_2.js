function(ev) {
        var $td, data,
          _this = this;
        ev.preventDefault();
        $td = jQuery(ev.target).closest('td');
        data = {
          subaction: 'disconnect',
          p2p_id: $td.find('input').val()
        };
        row_ajax_request($td, data, function(response) {
          remove_row($td);
          return refresh_candidates(response);
        });
        return null;
      }