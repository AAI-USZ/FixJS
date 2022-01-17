function parseLine(){
    var match, isInListOrTable;
    while(true){
      // Italic start
      if(match = advance(/^_(?=[^ \n]+)/)){
        if(builder.isOpen("i")){
          builder.pushString("_");
        } else {
          builder.pushTag("i");
        }
      }
      // bold start
      else if(match = advance(/^\*(?=[^ \n]+)/)){
        if(builder.isOpen("b")){
          builder.pushString("*");
        } else {
          builder.pushTag("b");
        }
      }
      // italic end
      else if(match = advance(/^([^ \n]+)_( +|(?=\n|$))/)){
        if(builder.isOpen("i")){
          builder.pushString(match[1]);
          builder.closeTag("i");
          builder.pushString(match[2]);
        } else {
          builder.pushString(match[1] + "_" + match[2]);
        }
      }
      // bold end
      else if(match = advance(/^([^ \n]+)\*( +|(?=\n|$))/)){
        if(builder.isOpen("b")){
          builder.pushString(match[1]);
          builder.closeTag("b");
          builder.pushString(match[2]);
        } else {
          builder.pushString(match[1] + "*" + match[2]);
        }
      }
      // link
      else if(match = advance(/^( *)"([^"]*)":([^ \n]+)/)) {
        builder.pushString(match[1]);
        builder.pushTag("a", {href: match[3]});
        builder.pushString(match[2]);
        builder.closeTag();
      }
      // Image
      else if(match = advance(/^( *)!([^!\(]+)(\(([^\)]*)\))?!(:([^ \n]+))?/)) {
        builder.pushString(match[1]);
        if(match[6]){
          builder.pushTag("a", {href: match[6]});
        }
        var attributes = {src: match[2]};
        if(match[4]){
          attributes.title = match[4];
        }
        builder.pushTag("img", attributes);
        builder.closeTag();
        if(match[6]){
          builder.closeTag();
        }
      }
      // word or blanks
      else if(match = advance(/^([^ \n]+)/)){
        builder.pushString(match[1]);
      }
      // blanks
      else if(match = advance(/^( +)/)){
        builder.pushString(match[1]);
      }
      // end of line
      else {
        advance(/^\n/);
        // If in List for example, surpress line break
        isInListOrTable = builder.popLineEnd();
        if(!isInListOrTable && !next(/^\s*(\n|$|[\*#] )/)){
          builder.pushString("<br/>");
        }
        return;
      }
    }
  }