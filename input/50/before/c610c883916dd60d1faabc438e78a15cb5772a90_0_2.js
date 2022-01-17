function(e) {
        e.preventDefault();

        var direction = $(this).attr("rel") === "prev" ? "toRight" : "toLeft";
        self._queue(self.move, direction);
      }