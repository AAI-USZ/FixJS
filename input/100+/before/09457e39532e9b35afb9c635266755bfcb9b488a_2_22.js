function measureLine(line, ch) {
      if (ch == 0) return {top: 0, left: 0};
      var extra = "";
      // Include extra text at the end to make sure the measured line is wrapped in the right way.
      if (options.lineWrapping) {
        var end = line.text.indexOf(" ", ch + 6);
        extra = htmlEscape(line.text.slice(ch + 1, end < 0 ? line.text.length : end + (ie ? 5 : 0)));
      }
      measure.innerHTML = "<pre>" + line.getHTML(makeTab, ch) +
        '<span id="CodeMirror-temp-' + tempId + '">' + htmlEscape(line.text.charAt(ch) || " ") + "</span>" +
        extra + "</pre>";
      var elt = document.getElementById("CodeMirror-temp-" + tempId);
      var top = elt.offsetTop, left = elt.offsetLeft;
      // Older IEs report zero offsets for spans directly after a wrap
      if (ie && top == 0 && left == 0) {
        var backup = document.createElement("span");
        backup.innerHTML = "x";
        elt.parentNode.insertBefore(backup, elt.nextSibling);
        top = backup.offsetTop;
      }
      return {top: top, left: left};
    }