function() {
            $(this).dialog("close");
            Edgar.vetting.classifyHabitat._removeAllFeatures();
            return $(Edgar.map).trigger('changemode', $(this).data('newMode'));
          }