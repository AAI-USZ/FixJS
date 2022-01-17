function(ev) {
        var $td, data,
          _this = this;
        $td = jQuery(ev.target).closest('td');
        data = {
          subaction: 'connect',
          to: $td.find('div').data('item-id')
        };
        row_ajax_request($td, data, function(response) {
          append_connection(response);
          if ($metabox.data('duplicate_connections')) {
            return $td.find('.p2p-icon').css('background-image', '');
          } else {
            return remove_row($td);
          }
        });
        return false;
      }