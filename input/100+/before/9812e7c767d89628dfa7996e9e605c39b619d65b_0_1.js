function(name, side) {
      // 本类对象的标题。
      var $indexFieldset = $('<fieldset><legend><a href="#' + name.toLowerCase() + '"><dfn>' + name + '</dfn></a></legend></fieldset>');
      var $detailsDiv = $('<div id="' + name.toLowerCase() + '"><h1><dfn>' + name + '</dfn></h1></div>');
      if (!manifest[name]) {
        return;
      }
      // 本类对象包含的内容分组。
      var group = {
        constructor: '<h2>构造函数</h2>',
        methods: '<h2>方法</h2>',
        properties: '<h2>属性</h2>'
      };
      // 注解信息（可以作用于一类对象内的多个 API）。
      var comment = '';
      var lastGroupName;
      manifest[name].forEach(function(name) {
        if (name.startsWith('#')) {
          comment = name.slice(1);
          $indexFieldset.append($('<h2>' + comment + '</h2>'));
        } else {
          var symbol = apiData[name];
          var category = getCategory(symbol);
          // 语法和说明。
          $indexFieldset.append($('<dl' + (category ? ' class="' + category + '"' : '') + '><dt><a href="#' + name.toLowerCase() + '">' + getSyntax(symbol, name) + '</a></dt><dd>' + getShortDescription(symbol) + '</dd></dl>'));
          // 详细信息。
          var groupName = symbol ? (symbol.isFunction ? (symbol.isConstructor ? 'constructor' : 'methods') : 'properties') : '';
          if (groupName && groupName !== lastGroupName) {
            $detailsDiv.append($(group[groupName]));
          }
          $detailsDiv.append($('<div id="' + name.toLowerCase() + '" class="symbol">' + '<h3>' + (comment ? '<span class="comment' + ('ES5/ES6/HTML5/DOM3'.contains(comment) ? ' patch' : '') + '">' + comment + '</span>' : '') + '<span class="category">' + category + '</span>' + getType(symbol) + getSyntax(symbol, name) + '</h3>' + getDescription(symbol) + getParameters(symbol) + getReturns(symbol) + getFires(symbol) + getRequires(symbol) + getSince(symbol) + getDeprecated(symbol) + getExample(symbol) + getSee(symbol) + '</div>'));
          lastGroupName = groupName;
        }
      });
      $details.append($detailsDiv);
      indexColumns[side].append($indexFieldset);
    }