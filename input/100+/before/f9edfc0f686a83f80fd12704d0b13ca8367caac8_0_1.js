function(start, stop, step, callback) {
      var target = expression;

      // Apply the summarize, if necessary.
      if (step !== 1e4) target = "summarize(" + target + ",'"
          + (!(step % 36e5) ? step / 36e5 + "hour" : !(step % 6e4) ? step / 6e4 + "min" : step + "sec")
          + "','" + sum + "')";

      d3.text(host + "/render?format=raw"
          + "&target=" + encodeURIComponent("alias(" + target + ",'')")
          + "&from=" + cubism_graphiteFormatDate(start - 2 * step) // off-by-two?
          + "&until=" + cubism_graphiteFormatDate(stop - 1000), function(text) {
        if (!text) return callback(new Error("unable to load data"));
        callback(null, cubism_graphiteParse(text));
      });
    }