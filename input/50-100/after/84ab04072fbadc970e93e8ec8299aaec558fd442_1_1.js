function() {
          var active = $('#list').find('.active');
          var full_ajax_url = active.attr("data-ajax_url") + '/' + active.attr("data-ajax_panelpage")
          KT.panel.panelAjax(active, full_ajax_url, $('#panel'), false);
        }