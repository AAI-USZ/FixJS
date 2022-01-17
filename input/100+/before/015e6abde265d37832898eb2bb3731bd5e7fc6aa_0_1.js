function(line, aline)
    {
      debugLog('padContents.lineToElement', line);
      var element = document.createElement("div");
      var emptyLine = (line == '\n');
      var domInfo = domline.createDomLine(!emptyLine, true);
      linestylefilter.populateDomLine(line, aline, this.apool, domInfo);
      domInfo.prepareForAdd();
      element.className = domInfo.node.className;
      element.innerHTML = domInfo.node.innerHTML;
      element.id = Math.random();
      return $(element);
    }