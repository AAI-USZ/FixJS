function(step, i) {
        var content, tip;
        content = "" + step.content + "<br /><p>";
        if (step.prev < 0) {
          content += "<a href='#" + step.next + "' class='next'>Next &raquo;</a> <a href='#' class='pull-right end'>End Tour</a>";
        } else if (step.end) {
          content += "<a href='#" + step.prev + "' class='prev'>&laquo; Prev</a><a href='#' class='pull-right end'>End Tour</a>";
        } else {
          content += "<a href='#" + step.prev + "' class='prev'>&laquo; Prev</a> |          <a href='#" + step.next + "' class='next'>Next &raquo;</a>          <a href='#' class='pull-right end'>End tour</a></p>";
        }
        $(step.element).popover({
          placement: step.placement,
          trigger: "manual",
          title: step.title,
          content: content,
          animation: step.animation
        }).popover("show");
        tip = $(step.element).data("popover").tip();
        this._reposition(tip);
        return this._scrollIntoView(tip);
      }