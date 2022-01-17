function(index, node) {
        var attrValueRegex = new RegExp(prefix + '__\\d+');
        var replacement = prefix + '__' + newIndex;

        if ($(node).attr("for")) {
          $(node).attr("for", $(node).attr("for").replace(attrValueRegex, replacement));
        }
        if ($(node).attr("name")) {
          $(node).attr("name", $(node).attr("name").replace(attrValueRegex, replacement));
        }
        if ($(node).attr("id")) {
          $(node).attr("id", $(node).attr("id").replace(attrValueRegex, replacement));
        }
        $(node).val("");
        $(node).removeClass("error");
      }