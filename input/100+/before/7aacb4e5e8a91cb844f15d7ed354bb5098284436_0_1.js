function (contents, source_name) {
    var rest = contents;
    var index = 0;

    var advance = function(amount) {
      rest = rest.substring(amount);
      index += amount;
    };

    var parseError = function(msg) {
      var lineNumber = contents.substring(0, index).split('\n').length + 1;
      var line = contents.split('\n')[lineNumber - 1];
      var info = "line "+lineNumber+", file "+source_name + "\n" + line;
      return new Error((msg || "Parse error")+" - "+info);
    };

    var results = {};
    html_scanner._initResults(results);

    var rOpenTag = /^\s*((<(template|head|body))|(<!--)|$)/i;

    while (rest) {
      var match = rOpenTag.exec(rest);
      if (! match)
        throw parseError(); // unknown text encountered

      advance(match.index + match[0].length);

      if (! match[1])
        break; // matched $ (end of file)
      if (match[4] === '<!--') {
        // top-level HTML comment
        var end = /-->/.exec(rest);
        if (! end)
          throw parseError("unclosed HTML comment");
        advance(end.index + end[0].length);
        continue;
      }

      // otherwise, a <tag>
      var tagName = match[3].toLowerCase();
      var tagAttribs = {}; // bare name -> value dict
      var rTagPart = /^\s*((([a-zA-Z0-9:_-]+)\s*=\s*"(.*?)")|(>))/;
      var attr;
      // read attributes
      while ((attr = rTagPart.exec(rest))) {
        advance(attr.index + attr[0].length);
        if (attr[1] === '>')
          break;
        // XXX we don't HTML unescape the attribute value
        // (e.g. to allow "abcd&quot;efg") or protect against
        // collisions with methods of tagAttribs (e.g. for
        // a property named toString)
        tagAttribs[attr[3]] = attr[4];
      }
      if (! attr) // didn't end on '>'
        throw new parseError("Missing '>'");
      // find </tag>
      var end = (new RegExp('</'+tagName+'>', 'i')).exec(rest);
      if (! end)
        throw new parseError("unclosed <"+tagName+">");
      var tagContents = rest.slice(0, end.index);
      advance(end.index + end[0].length);

      // act on the tag
      html_scanner._handleTag(results, tagName, tagAttribs, tagContents,
                              parseError);
    }

    return results;
  }