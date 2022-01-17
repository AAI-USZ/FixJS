function() {
      $(".wrap.settings-wrap .ui-tabs").tabs({ 
        fx: { 
          opacity: "toggle", 
          duration: "fast" 
        }
      }).bind("tabsselect", function(event, ui) {
        $("input[name=\'_wp_http_referer\']").val(ui.tab);
      });
    }