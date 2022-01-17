function (content, isCDATA) {
        if (content.replace(/^\s+$/g,"") === "") {
          return null;
        }
        var pcdata = new XMLElement();
        pcdata.type = "TEXT";
        pcdata.content = content;
        return pcdata;
      }