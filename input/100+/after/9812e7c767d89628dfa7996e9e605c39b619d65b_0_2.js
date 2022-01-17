function(listen, notify) {
//--------------------------------------------------[getCategory]
    var getCategory = function(symbol) {
      return symbol ? (symbol.isConstructor ? 'constructor' : (symbol.isStatic ? 'static' : 'instance')) : '';
    };

//--------------------------------------------------[getType]
    var getType = function(symbol) {
      return symbol && symbol.type ? '<kbd>&lt;' + symbol.type + '&gt;</kbd>' : '';
    };

//--------------------------------------------------[getSyntax]
    var getSyntax = function(symbol, name) {
      var syntax;
      if (symbol) {
        syntax = '';
        if (!symbol.isStatic) {
          name = name.replace('.prototype.', '.');
        }
        var parents = name.split('.');
        var symbolName = parents.pop();
        // Global 对象不在语法中显示。
        if (parents[0] === 'Global') {
          parents.shift();
        }
        // 列出其他的 namespace 或 instance。
        var lastIndex = parents.length - 1;
        parents.forEach(function(member, index) {
          if (index === lastIndex && !symbol.isStatic) {
            syntax += '<samp>' + member.toLowerCase() + '</samp>.';
          } else {
            syntax += '<cite>' + member + '</cite>.';
          }
        });
        // 本对象的名称。
        syntax += '<dfn>' + symbolName + '</dfn>';
        // 生成函数对象的参数部分。
        if (symbol.isFunction) {
          var parameters = symbol.parameters;
          var optionalCount = 0;
          syntax += '(' + parameters.filter(
              function(parameter) {
                // 忽略选项中的参数。
                return !parameter.name.contains('.');
              }
          ).map(
              function(parameter, index) {
                var name = '<var>' + parameter.name + '</var>';
                var separator = index ? ', ' : '';
                if (parameter.isOptional) {
                  name = '[' + separator + name;
                  optionalCount++;
                } else {
                  name = separator + name;
                }
                return name;
              }
          ).join('') + ']'.repeat(optionalCount) + ')';
        }
      } else {
        syntax = '<em>' + name + '</em> *';
      }
      return syntax;
    };

//--------------------------------------------------[getShortDescription]
    var getShortDescription = function(symbol) {
      var shortDescription = '-';
      if (symbol) {
        var index = symbol.description.indexOf('<br>');
        shortDescription = symbol.description.slice(0, index === -1 ? undefined : index);
      }
      return shortDescription;
    };

//--------------------------------------------------[getDescription]
    var getDescription = function(symbol) {
      return '<blockquote>' + (symbol ? symbol.description : '-') + '</blockquote>';
    };

//--------------------------------------------------[getParameters]
    var getParameters = function(symbol) {
      return symbol && symbol.parameters.length ?
          '<dl><dt>参数：</dt><dd><table>' + symbol.parameters.map(
              function(parameter) {
                return '<tr><td><kbd>&lt;' + parameter.type + '&gt;</kbd></td><td><dfn>' + parameter.name.replace('options.', '<var>options.</var>') + (parameter.isOptional ? '<em>Optional</em>' : '') + '</dfn></td><td>' + parameter.description + '</td></tr>';
              }
          ).join('') + '</table></dd></dl>' :
          '';
    };

//--------------------------------------------------[getReturns]
    var getReturns = function(symbol) {
      return symbol && symbol.returns.length ?
          '<dl><dt>返回值：</dt><dd><table>' + symbol.returns.map(
              function(returnValue) {
                return '<tr><td><kbd>&lt;' + returnValue.type + '&gt;</kbd></td><td>' + returnValue.description + '</td></tr>';
              }
          ).join('') + '</table></dd></dl>' :
          '';
    };

//--------------------------------------------------[getFires]
    var getFires = function(symbol) {
      return symbol && symbol.fires.length ?
          '<dl class="event"><dt>触发事件：</dt><dd><table>' + symbol.fires.map(
              function(event) {
                return '<tr><td><dfn>' + event.name + '</dfn></td><td>' + event.description + '</td></tr>';
              }
          ).join('') + '</table></dd></dl>' :
          '';
    };

//--------------------------------------------------[getRequires]
    var getRequires = function(symbol) {
      return symbol && symbol.requires.length ?
          '<dl><dt>要求：</dt>' + symbol.requires.map(
              function(require) {
                return '<dd>' + require + '</dd>';
              }
          ).join('') + '</dl>' :
          '';
    };

//--------------------------------------------------[getSince]
    var getSince = function(symbol) {
      return symbol && symbol.since ? '<dl><dt>在以下版本中加入：</dt><dd>' + symbol.since + '</dd></dl>' : '';
    };

//--------------------------------------------------[getDeprecated]
    var getDeprecated = function(symbol) {
      return symbol && symbol.deprecated ? '<dl><dt>已过期：</dt><dd>' + symbol.deprecated + '</dd></dl>' : '';
    };

//--------------------------------------------------[getExample]
    var getExample = function(symbol) {
      return symbol && symbol.examples.length ?
          '<dl><dt>示例：</dt><dd>' + symbol.examples.map(
              function(example) {
                return '<pre class="prettyprint">' + example + '</pre>';
              }
          ).join('') + '</dd></dl>' :
          '';
    };

//--------------------------------------------------[getSee]
    var getSee = function(symbol) {
      return symbol && symbol.see.length ?
          '<dl><dt>请参阅：</dt>' + symbol.see.map(
              function(see) {
                return '<dd>' + see + '</dd>';
              }
          ).join('') + '</dl>' :
          '';
    };

//--------------------------------------------------[getAuthor]
//    var getAuthor = function(symbol) {
//      return symbol && symbol.author ? '<dl><dt>Author:</dt><dd>' + symbol.author + '</dd></dl>' : '';
//    };

//--------------------------------------------------[生成一类对象的文档]
    var indexColumns = {
      a: $('#column_a'),
      b: $('#column_b'),
      c: $('#column_c')
    };
    // 同时生成索引文档和细节文档，side 参数仅供索引文档使用。
    var buildDocument = function(name, side) {
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
      $('#details').append($detailsDiv);
      indexColumns[side].append($indexFieldset);
    };

//--------------------------------------------------[列出名单中的指定内容]
    listen('build', function() {
      [
        'Global',
        'Object',
        'Array',
        'String',
        'Boolean',
        'Number',
        'Math',
        'Date',
        'RegExp',
        'JSON',
        'navigator',
        'location',
        'cookie',
        'localStorage'
      ]
          .forEach(function(name) {
            buildDocument(name, 'a');
          });
      [
        'window',
        'document',
        'Element',
        'Event'
      ]
          .forEach(function(name) {
            buildDocument(name, 'b');
          });
      [
        'Component',
        'Request',
        'Animation',
        'Switcher',
        'TabPanel',
        'Dialog',
        'Calendar'
      ]
          .forEach(function(name) {
            buildDocument(name, 'c');
          });
    });

  }