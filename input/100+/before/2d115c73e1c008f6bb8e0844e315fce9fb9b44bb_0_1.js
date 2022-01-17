function (options) {
    var o = $.extend({}, $.fn.addTableFilter.defaults, options),
      tgt,
      id,
      label,
      input;

    if (this.is("table")) {
      // Generate ID
      if (!this.attr("id")) {
        this.attr({
          id: "t-" + Math.floor(Math.random() * 99999999)
        });
      }
      tgt = this.attr("id");
      id = tgt + "-filtering";

      // Build filtering form
      label = $("<label/>").attr({
        "for": id
      }).append(o.labelText);
      input = $("<input/>").attr({
        id:   id,
        type: "search",
        size: o.size
      });
      $("<p/>").addClass("formTableFilter").append(label).append(input).insertBefore(this);

      // Bind filtering function
      $("#" + id).delayBind("keyup", function (e) {
        var words = $(this).val().toLowerCase().split(" ");
        $("#" + tgt + " tbody tr").each(function () {
          var s = $(this).html().toLowerCase().replace(/<.+?>/g, "").replace(/\s+/g, " "),
            state = 0;
          $.each(words, function () {
            if (s.indexOf(this) < 0) {
              state = 1;
              return false; // break $.each()
            }
          });

          if (state) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      }, 300);
    }

    return this;
  }