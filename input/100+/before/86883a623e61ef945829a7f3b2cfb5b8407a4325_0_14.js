function(line) {
        if (line.hidden) {
          html.push("<pre></pre>");
        } else {
          var marker = line.gutterMarker;
          var text = options.lineNumbers ? i + options.firstLineNumber : null;
          if (marker && marker.text)
            text = marker.text.replace("%N%", text != null ? text : "");
          else if (text == null)
            text = "\u00a0";
          html.push((marker && marker.style ? '<pre class="' + marker.style + '">' : "<pre>"), text);
          for (var j = 1; j < line.height; ++j) html.push("<br/>&#160;");
          html.push("</pre>");
          if (!marker) normalNode = i;
        }
        ++i;
      }