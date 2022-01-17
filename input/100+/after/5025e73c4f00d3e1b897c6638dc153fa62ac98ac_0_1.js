function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("xml-cdata", "]]>"));
          else return null;
        }
        else if (stream.match("--")) return chain(inBlock("xml-comment", "-->"));
        else if (stream.match("DOCTYPE")) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(inBlock("xml-doctype", ">"));
        }
        else return null;
      }
      else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("xml-processing", "?>");
        return "xml-processing";
      }
      else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        stream.eatSpace();
        tagName = "";
        var c;
        while ((c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/))) tagName += c;
        state.tokenize = inTag;
        return "xml-tag";
      }
    }
    else if (ch == "&") {
      stream.eatWhile(/[^;]/);
      stream.eat(";");
      return "xml-entity";
    }
    else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }