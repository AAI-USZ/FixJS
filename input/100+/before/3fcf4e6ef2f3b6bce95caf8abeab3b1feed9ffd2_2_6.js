function() {
  var text, selectionStart, startOfParagraphs, endOfParagraphs, oldExtendedSelectionLength, currentNodes = {},
  $ = jQuery;

  /**
   * Iterate over each paragraph and call the functor on it and set the paragraphs
   * CONSIDER rename or move setParagraphs out of it
   * 
   * @param {Mode} mode The current mode
   * @param {Function} functor The functor will be applied on each paragraph
   */
  function eachParagraph(mode, functor) {
    var paragraphs = mode.getParagraphs(), paragraphsLength = paragraphs.length;

    for(i = 0; i < paragraphsLength; i++) {
      paragraphs[i] = functor(paragraphs[i]);
    }
    mode.setParagraphs(paragraphs);
  }

  function eachLine(lines, functor){
    var linesLength = lines.length,
    i, line, lineStart, match;
    for(i = 0; i < linesLength; i++) {
      line = lines[i];

      // Skip blank lines
      if( !/^\s*$/.test(line)) {
        match = line.match(/^((?:\w+\. )?(?: *[\*#] )?)\s*(.*)/);
        lineStart = match[1];
        line = match[2];

        functor(i, lineStart, line);
      }
    }
  }

  function replaceEachLine(mode, boundary, functor){
    var lines = mode.getSelection(boundary).split("\n");

    eachLine(lines, function(i, lineStart, line){
      lines[i] = functor(lineStart, line);
    });
    
    mode.replaceSelection(lines.join("\n"));
  }

  function firstLine(mode){
    var lines = mode.getSelection("\n").split("\n").slice(0,1),
    lineLength = lines[0].length;
    mode.selectionEnd = mode.selectionStart + lineLength;
    eachLine(lines, function(i, lineStart, line){
      mode.selectionStart += lineStart.length;
      lines[i] = line;
    });
    return lines[0];
  }

  /**
   * Execute align command
   * 
   * @param {Mode} mode The current mode
   * @param {String} orientation The orientation of the alignment
   */
  function align(mode, orientation) {
    eachParagraph(mode, function(paragraph) {
      var classes, classesLength, newClasses = [];
      if(/^\w+\([^)]+\)\./.test(paragraph)) {
        classes = jQuery.trim(paragraph.slice(paragraph.indexOf("(") + 1, paragraph.indexOf(")"))).split(/\s+/);
        classesLength = classes.length;
        for(i=0 ; i < classesLength ; i++ ){
          if(classes[i] != 'right' && classes[i] != 'left' && classes[i] != 'center'){
            newClasses.push(classes[i]);
          }
        }
        newClasses.push(orientation);
        return paragraph.replace(/^(\w+)[^.]+.\s+/, "$1(" + newClasses.join(" ") + "). ");
      } else if(/^\w+\./.test(paragraph)) {
        return paragraph.replace(/^(\w+)\.\s*/, "$1(" + orientation + "). ");
      } else {
        return "p(" + orientation + "). " + paragraph;
      }
    });
  }

  /**
   * Scan the textarea for the first match and set selection to it.
   * This is useful e.g. for finding a link markup with a given source
   * 
   * @param {Mode} mode The current mode
   * @param {RegExp} r The regexp to search for
   */
  function scanForMatch(mode,r){
    var match = r.exec(text);
    if(r.lastIndex === 0){
      return;   // TODO escalate this return to break the caller too
    }
    while(r.lastIndex < selectionStart){
      match = r.exec(text);
    }

    // needed for the replaceSelection call
    mode.selectionStart = r.lastIndex - match[0].length;
    mode.selectionEnd = r.lastIndex;
    return match;
  }

  function toggleList(mode, target, bullet){
    replaceEachLine(mode, "\n", function(lineStart, line){
      if(!/ on$/.test(target.className)){
        line = bullet + " " + line;
      }
      return line;
    });
  }

  var listTypes = {
    ul: '*',
    ol: '#'
  };

  /**
   * @returns {Boolean} return false to prevent browser
   * CONSIDER move to object or remove mode parameter
   */
  function pressedEnter(mode){
    var list = currentNodes.list, replacement;

    if(list && /(u|o)l/i.test(list.tag)){ // only headings
      mode.getSelection();
      if(mode.holdShift){
        replacement = " <br> ";
      } else {
        replacement = "\n" + listTypes[list.tag] + " ";
      }
      mode.replaceSelection(replacement, false);
      return false;
    }
  }

  return {
    name: "Textile Mode",
    items: {
      "default": {
        clicked: function(editor, mode, target) {
          // TODO find left and right boundaries that are valid
          var match, that = this;
          replaceEachLine(mode, " ", function(lineStart, line){
            if(/ on$/.test(target.className)){
              
              // first handle the left part
              match = line.match(that.leftRegExp);
              if(match){
                line = (match[1] || "") + line.slice(match[0].length);
              } else {
                // place delimiter left and extend selection
                line = that.delimiter + mode.extendLeftSelection(/[ .]+/) + line;
              }

              // Then handle the right
              match = line.match(that.rightRegExp);
              if(match){
                line = line.slice(0, - match[0].length) + (match[1] || ""); 
              } else {
                line += mode.extendRightSelection(/ +/) + that.delimiter;
              }
              
            } else {
              // Apply markup within a block so that "*h1. ...*" for
              // example is never produced
              line = $.trim(that.delimiter + line) + that.delimiter;
            }
            return lineStart + line;
          });
        }
      },
      bold: {
        delimiter: "*",
        leftRegExp: /^(\w+\. )?\s*\*/,
        rightRegExp: /\*([\.]*)$/
      },
      italic: {
        delimiter: "_",
        leftRegExp: /^(\w+\. )?\s*_/,
        rightRegExp: /_([\.]*)$/
      },
      alignLeft: {
        clicked: function(editor, mode) {
          align(mode, "left");
        }
      },
      alignRight: {
        clicked: function(editor, mode) {
          align(mode, "right");
        }
      },
      alignCenter: {
        clicked: function(editor, mode) {
          align(mode, "center");
        }
      },
      unorderedList: {
        clicked: function(editor, mode, target) {
          toggleList(mode, target, "*");
        }
      },
      orderedList: {
        clicked: function(editor, mode, target) {
          toggleList(mode, target, "#");
        }
      },
      link: {
        clicked: function(editor, mode, target) {
          var dialog, callback, titleString, href, r, match;
          
          callback = {
            submit: function(title,uri){
              mode.replaceSelection("\"" + title + "\":" + uri);
            },
            remove: function(){
              mode.replaceSelection(match[1]);
            },
            close: function(){
              mode.updatePreview();
              editor.checkState();
            }
          };

          if(/ on$/.test(target.className)){
            dialog = ME.dialog.link(['Update','Remove','Cancel']);
            href = currentNodes.a.attributes.href;

            match = scanForMatch(mode,new RegExp('\"([^\"]*)\":'+href,'g'));

            titleString = match[1];
            dialog.val('input.uri', href);
          }
          else {
            dialog = ME.dialog.link(['Create','Cancel']);
            titleString = firstLine(mode);
          }
          
          if(!/^\s*$/.test(titleString)){
            dialog.val('.title', titleString);
          }
          
          dialog.dialog('open', callback);
        }
      },
      insertImage: {
        clicked: function(editor, mode, target) {
          var dialog, callback, href, src, r;

          callback = {
            submit: function(imageUri,title,uri){
              var replacement = imageUri;
              if(title && !/^\s*$/.test(title)){
                replacement = replacement + "(" + title + ")";
              }
              replacement = "!" + replacement + "!";
              if(uri && !/^\s*$/.test(uri)){
                replacement = replacement + ":" + uri;
              }

              mode.replaceSelection(replacement);
            },
            remove: function(){
              mode.replaceSelection("");
            },
            close: function(){
              mode.updatePreview();
              editor.checkState();
            }
          };
          
          if(/ on$/.test(target.className)){
            dialog = ME.dialog.insertImage(['Update','Remove','Cancel']);
            src = currentNodes.img.attributes.src;

            scanForMatch(mode, new RegExp('!' + src + "(\\([^\\)]*\\))?!(:[^ \n]*)?",'g'));
            
            if(currentNodes.a){
              href = currentNodes.a.attributes.href;
            }
            dialog.val('input.uri', href);
            dialog.val('input.imageUri', src);
            dialog.val('input.title', currentNodes.img.attributes.title);
          }
          else {
            dialog = ME.dialog.insertImage(['Create','Cancel']);
            firstLine(mode);
          }

          dialog.dialog('open', callback);
        }
      },
      formatBlock: {
        clicked: function(editor, mode, target) {
          eachParagraph(mode, function(paragraph) {
            if(/^\w+(\([\w ]+\))?\./.test(paragraph)) {
              return paragraph.replace(/^\w+(\([\w ]+\))?\.\s+/, target.value + "$1. ");
            } else if(/^[\*#] /.test(paragraph)){ // ignore lists
              return paragraph;
            } else {
              return target.value + ". " + paragraph;
            }
          });
        }
      }
    },
    /**
     * Compile textile and update the preview div
     */
    updatePreview: function() {
      var html = textileCompiler.compile(this.textArea.val());
      this.htmlDiv.html(html);
    },
    /**
     * Convert preview div to textile
     * 
     * @returns {String} A textile string
     */
    toText: function(html) {
      if(!html){
        html = this.htmlDiv.html();
      }

      function eachRegexp(tags, callback){
        var i, item,
        items = {
          b: [/<(?:b|strong)>((.|[\r\n])*?)<\/(?:b|strong)>/gi,'*'],
          i: [ /<(?:i|em)>((.|[\r\n])*?)<\/(?:i|em)>/gi, '_'],
          del: [ /<(?:strike|del)>((.|[\r\n])*?)<\/(?:strike|del)>/gi, '-'],
          u: [ /<(?:u|ins)>((.|[\r\n])*?)<\/(?:u|ins)>/gi, '+']
        };
        for(i = tags.length; i; i--){
          item = items[tags[i-1]];
          callback(item[0], item[1]);
        }
      }

      html = html.replace(/\s*<(ul|ol)>((.|[\r\n])*?)<\/\1>\s*/gi, function(match, tag, items){
        var bullet = tag == 'ul' ? '*' : '#';
        
        eachRegexp(['b','i', 'u', 'del'], function(regexp, delimiter){
          items = items.replace(regexp, delimiter + '$1' + delimiter);
        });

        return items.replace(/\s*<li>((.|[\r\n])*?)<\/li>\s*/gi, bullet + " $1\n") + "\n";
      });
      
      html = html.replace(/ *<(p|h[1-4])([^>]*)>((.|[\r\n])*?)<\/\1>\s*/gi, function(match, tag, attributes, content){
        var front = "", cssClass = attributes.match(/class=\"([^"]*)/);
        if(cssClass){
          front = tag + "(" + cssClass[1] + "). ";
        } else if(tag != "p"){
          front = tag + ". ";
        }

        eachRegexp(['b','i', 'u', 'del'], function(regexp, d){
          content = content.replace(regexp, function(match, text){
            return d + text.replace(/<br ?\/?>\s*/gi, d + "\n" + d) + d;
          });
        });
        
        return front + content.replace(/<br ?\/?>\s*/gi, "\n") + "\n\n";
      });
      
      html = html.replace(/<img[^>]*>/gi, function(match){
        var img = $(match),
        replacement = img.attr('src'),
        title = img.attr('title');

        if(title && !/^\s*$/.test(title)){
          replacement = replacement + "(" + title + ")";
        }
        return "!" + replacement + "!";
      });
      html = html.replace(/<a href="([^\"]*)">((.|[\r\n])*?)<\/a>/gi, function(match, uri, content){
        if(/^\s*![^!]+!\s*$/.test(content)){
          return $.trim(content) + ":" + uri;
        } else {
          return "\"" + content + "\":" + uri;
        }
      });
      html = html.replace(/\s*<code[^>]*>((.|[\r\n])*?)<\/code>\s*/gi, ' @$1@ ');
      html = html.replace(/(\r\n|\n){3,}/g, "\n\n");
      html = html.replace(/&nbsp;/g, ' ');
      html = html.replace(/^[\r\n]+|[\r\n]+$/g, '');

      return html;
    },
    /**
     * Get the states for the current selection
     * 
     * @return {Object} An object representing the states
     */
    getSelectionStates: function() {
      var paragraphs = this.getExtendedSelection(),
      startTrace = selectionStart - startOfParagraphs,
      endTrace = selectionEnd - startOfParagraphs;
      trace = textileCompiler.trace(paragraphs, startTrace, endTrace);

      return this.buildStateObject(trace, currentNodes = {});
    },
    /**
     * Get the paragraphs containing the current selection
     * 
     * CONSIDER remove this? is it only needed for getParagraphs?
     * 
     * @returns {String} The paragraphs
     */
    getExtendedSelection: function(){
      var paragraphIndex, searchIndex = 0, extendedSelection;
      selectionStart = this.textArea[0].selectionStart;
      selectionEnd = this.textArea[0].selectionEnd;
      text = this.textArea.val();
      startOfParagraphs = 0; endOfParagraphs = -1;

      while((paragraphIndex = text.indexOf("\n\n",searchIndex) + 2 ) !== 1) {
        if(selectionStart > paragraphIndex) {
          startOfParagraphs = paragraphIndex;
        } else if (selectionEnd < paragraphIndex) {
          endOfParagraphs = paragraphIndex - 2;
          break;
        }
        searchIndex = paragraphIndex;
      }
      
      if(endOfParagraphs === -1) {
        extendedSelection = text.slice(startOfParagraphs);
      } else {
        extendedSelection = text.slice(startOfParagraphs, endOfParagraphs);
      }
      oldExtendedSelectionLength = extendedSelection.length;

      return extendedSelection;
    },
    /**
     * @returns {String[]} An array of paragraphs
     */
    getParagraphs: function() {
      return this.getExtendedSelection().split(/\n\n+/);
    },
    /**
     * Set the paragraphs and move the caret
     * 
     * @param {String[]} paragraphs An array of paragraphs
     */
    setParagraphs: function(paragraphs) {
      paragraphs = paragraphs.join("\n\n");

      if(endOfParagraphs === -1) {
        this.textArea.val(text.slice(0,startOfParagraphs) + paragraphs);
      } else {
        this.textArea.val(text.slice(0,startOfParagraphs) + paragraphs + text.slice(endOfParagraphs));
      }
      
      this.moveCaret(paragraphs.length - oldExtendedSelectionLength);
    },
    /**
     * Move the caret by the given distance. Positive values move the caret to 
     * the right, negative to the left.
     * 
     * @param {Integer} distance The distance to move the caret
     */
    moveCaret: function(distance) {
      // console.log("Moving caret: " + distance);

      if(Math.abs(selectionStart - startOfParagraphs) > Math.abs(distance)) {
        selectionStart += distance;
      } else {
        selectionStart = startOfParagraphs;
      }
      
      this.textArea.focus();
      this.textArea[0].setSelectionRange(selectionStart, selectionStart);
    },
    pressed: function(keyCode){
      // console.log("pressed", keyCode);
      switch(keyCode){
      case 13: // enter
        return pressedEnter(this);
      default: // handle keyCombos
        this.prototype.pressed.apply(this, [keyCode]);
      }
    }
  };
}