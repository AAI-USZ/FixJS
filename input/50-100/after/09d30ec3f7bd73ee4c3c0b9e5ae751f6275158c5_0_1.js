function(ev) {
        var $td, data,
          _this = this;
        ev.preventDefault();
        if (!confirm(P2PAdmin.deleteConfirmMessage)) {
          return;
        }
        $td = jQuery(ev.target).closest('td');
        data = {
          subaction: 'clear_connections'
        };
        row_ajax_request($td, data, function(response) {
          $connections.hide().find('tbody').html('');
          return refresh_candidates(response);
        });
        return null;
      }