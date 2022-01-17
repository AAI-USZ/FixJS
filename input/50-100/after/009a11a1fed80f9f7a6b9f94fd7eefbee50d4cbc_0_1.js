function() {
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
      }