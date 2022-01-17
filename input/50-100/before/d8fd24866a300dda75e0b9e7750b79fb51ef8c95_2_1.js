function() {
          var active = $('#list').find('.active');
          KT.panel.panelAjax(active, active.attr("data-ajax_url"), $('#panel'), false);
        }