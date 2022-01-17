function (content) {
        if(content.replace(/^\s+$/g,"") === "") {
          return null;
        }
        var pcdata = new XMLElement();
        pcdata.content = content;
        pcdata.type = "TEXT";
        return pcdata;
      }