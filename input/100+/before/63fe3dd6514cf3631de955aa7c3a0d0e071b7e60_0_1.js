function(tag, from) {
      var i = -1, data = [ ],
        element, elements = (from || doc).getElementsByTagName(tag);
      if (tag == '*') {
        var j = -1;
        while ((element = elements[++i])) {
          if (element.nodeName > '@')
            data[++j] = element;
        }
      } else {
        while ((element = elements[++i])) {
          data[i] = element;
        }
      }
      return data;
    }