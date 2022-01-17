function() {
        var root = jQuery(this);
        var form = root.find('.gp_local_filter');
        var list = root.find('.gp_local_results');
        var controlOrder = root.find('.gp_local_controlOrder');
        var controlBatch = root.find('.gp_local_controlBatch');
        var controlPaging = root.find('.gp_local_controlPaging');
        var url = form.attr('data-ajaxurl');
        var listTemplate = config.listTemplate;
        

        
        // Creates Results Filter instance
        var resultsFilter = new graphite.blocks.navigation.resultsFilter.obj(
          jQuery.extend(
            {},
            config,
            {
              root: root,
              form: form,
              list: list,
              url: url,
              controlOrder: controlOrder,
              controlBatch: controlBatch,
              controlPaging: controlPaging
            }
          )
        );
        resultsFilter.init(); // Runs filter
      }