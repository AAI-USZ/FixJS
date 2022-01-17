function() {
    document.removeEventListener('DOMContentLoaded', init, false);

    var canvas = document.getElementsByTagName('canvas'),
      filenames;

    for (var i = 0, l = canvas.length; i < l; i++) {
      // datasrc and data-src are deprecated.
      var processingSources = canvas[i].getAttribute('data-processing-sources');
      if (processingSources === null) {
        // Temporary fallback for datasrc and data-src
        processingSources = canvas[i].getAttribute('data-src');
        if (processingSources === null) {
          processingSources = canvas[i].getAttribute('datasrc');
        }
      }
      if (processingSources) {
        filenames = processingSources.split(' ');
        for (var j = 0; j < filenames.length;) {
          if (filenames[j]) {
            j++;
          } else {
            filenames.splice(j, 1);
          }
        }
        loadSketchFromSources(canvas[i], filenames);
      }
    }

    // also process all <script>-indicated sketches, if there are any
    var scripts = document.getElementsByTagName('script');
    var s, source, instance;
    for (s = 0; s < scripts.length; s++) {
      var script = scripts[s];
      if (!script.getAttribute) {
        continue;
      }

      var type = script.getAttribute("type");
      if (type && (type.toLowerCase() === "text/processing" || type.toLowerCase() === "application/processing")) {
        var target = script.getAttribute("data-processing-target");
        canvas = undef;
        if (target) {
          canvas = document.getElementById(target);
        } else {
          var nextSibling = script.nextSibling;
          while (nextSibling && nextSibling.nodeType !== 1) {
            nextSibling = nextSibling.nextSibling;
          }
          if (nextSibling.nodeName.toLowerCase() === "canvas") {
            canvas = nextSibling;
          }
        }

        if (canvas) {
          if (script.getAttribute("src")) {
            filenames = script.getAttribute("src").split(/\s+/);
            loadSketchFromSources(canvas, filenames);
            continue;
          }
          source =  script.textContent || script.text;
          instance = new Processing(canvas, source);
        }
      }
    }
  }