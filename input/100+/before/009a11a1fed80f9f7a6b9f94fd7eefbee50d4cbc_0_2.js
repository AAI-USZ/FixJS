function(defaults) {
    var opts = $.extend({
          clearOnSubmit: true,
          noticeDialog: (function() {
            var $e = $("<p />", {"class": "remember_state"})
                     .html('Do you want to <a href="#">restore your previously entered info</a>?');
            return $e;
          })(),
          noticeSelector: ".remember_state",
          objName: false }, defaults);
    var use_ids = !(!!opts.objName);
    if (!("prop" in $.fn)) { $.fn.prop = $.fn.attr; }
    if (opts.noticeDialog.length && typeof opts.noticeDialog === "object") {
      opts.noticeDialog.find("a").bind("click.remember_state", function(e) {
        var data = localStorage.getObject(opts.objName),
            $f = $(this).closest("form"),
            $e;
        for (var i in data) {
          $e = $f.find("[name=\"" + data[i].name + "\"]");
          if ($e.is(":radio, :checkbox")) {
            $e.filter("[value=" + data[i].value + "]").prop("checked", true);
          }
          else if ($e.is("select")) {
            $e.find("[value=" + data[i].value + "]").prop("selected", true);
          }
          else { $e.val(data[i].value); }
        }
        opts.noticeDialog.remove();
        e.preventDefault();
      });
    }
    if (this.length > 1) {
      if (console.log) {
        console.log("WARNING: Cannot process more than one form with the same" +
          " object. Attempting to use form IDs instead.");
      }
      use_ids = true;
    }
    return this.each(function() {
      var $form = $(this);
      if (use_ids) {
        if ($form.attr("id")) {
          opts.objName = $form.attr("id");
        }
        else {
          if (console.log) {
            console.log("ERROR: No form ID or object name. Add an ID or pass" +
              " in an object name");
            return this;
          }
        }
      }
      if (localStorage[opts.objName]) {
        (opts.noticeDialog.length && typeof opts.noticeDialog === "object") ?
          opts.noticeDialog.prependTo($form) :
          $form.find(opts.noticeSelector).show();
      }
      $form.bind("reset_state", function() {
        delete localStorage[opts.objName];
      });
      if (opts.clearOnSubmit) {
        $form.bind("submit.remember_state", function() {
          $(this).trigger("reset_state");
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
        localStorage.setObject(opts.objName, values);
      });
      $form.find(":reset").bind("click.remember_state", function() {
        $(this).closest("form").trigger("reset_state");
      });
    });
  }