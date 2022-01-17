function() {
      var $form = $(this);
      if (use_ids) {
        if ($form.attr("id")) {
          opts.objName = $form.attr("id");
        }
        else {
          if (console && console.log) {
            console.log("ERROR: No form ID or object name. Add an ID or pass" +
              " in an object name");
            return this;
          }
        }
      }
      if (getObject(opts.objName)) {
        (opts.noticeDialog.length && typeof opts.noticeDialog === "object") ?
          opts.noticeDialog.prependTo($form) :
          $form.find(opts.noticeSelector).show();
      }
      $form.bind("reset_state.remember_state", function() {
  	    localStorage.removeItem(opts.objName);
      });
      if (opts.clearOnSubmit) {
        $form.bind("submit.remember_state", function() {
          $form.trigger("reset_state");
          $(window).unbind("unload.remember_state");
        });
      }
      $(window).bind("unload.remember_state", function() {
        var values = $form.serializeArray();
        // jQuery doesn't currently support datetime-local inputs despite a
        // comment by dmethvin stating the contrary:
        // http://bugs.jquery.com/ticket/5667
        // Manually storing input type until jQuery is patched
        $form.find("input[type='datetime-local']").each(function() {
          var $i = $(this);
          values.push({ name: $i.attr("name"), value: $i.val() });
        });
        if ( values.length )
          localStorage.setItem(opts.objName, JSON.stringify(values));
      });
      $form.find(":reset").bind("click.remember_state", function() {
        $(this).closest("form").trigger("reset_state");
      });
    }