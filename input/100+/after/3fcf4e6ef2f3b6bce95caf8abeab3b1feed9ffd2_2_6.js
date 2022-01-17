function() {
  var $ = jQuery, textileMode;

  /**
   * Iterate over each paragraph and call the functor on it and set the paragraphs
   * CONSIDER rename or move setParagraphs out of it
   *
   * @param {Editor} editor The editor to work on
   * @param {Function} functor The functor will be applied on each paragraph
   */
  function eachParagraph(editor, functor) {
    var paragraphs = textileMode.getParagraphs(editor), paragraphsLength = paragraphs.length;

    for(i = 0; i < paragraphsLength; i++) {
      paragraphs[i] = functor(paragraphs[i]);
    }
    textileMode.setParagraphs(editor, paragraphs);
  }

  /**
   * Apply the functor to each given line
   *
   * @param {String[]} lines The line array
   * @param {Function} functor The function which will be applied to
   * each line
   */
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

  /**
   * Apply the functor to each line of the current selection.
   *
   * @param {Editor} editor The editor to work on
   * @param {String} boundary The boundary to which the Selection will
   * be extended e.g. '\n', ' '
   * @param {Function} functor The function to apply to each line
   */
  function replaceEachLine(editor, boundary, functor){
    var lines = textileMode.extendSelection(editor, boundary).split("\n");

    eachLine(lines, function(i, lineStart, line){
      lines[i] = functor(lineStart, line);
    });
    
    textileMode.replaceSelection(editor, lines.join("\n"));
  }

  /**
   * Get the first line of the selection, without the special textile
   * tokens which might be at the start of the line.
   *
   * @param {Editor} editor The editor to work on
   *
   * @returns {String} The first line of the selection
   */
  function firstLine(editor, boundary){
    // lines has only one element
    var lines = textileMode.extendSelection(editor, boundary).split("\n").slice(0,1),
    lineLength = lines[0].length;
    editor.selectionEnd = editor.selectionStart + lineLength;
    // Ignore special textile tokens at the beginnig of the line
    eachLine(lines, function(i, lineStart, line){
      editor.setSelectionRange( editor.selectionStart + lineStart.length, editor.selectionEnd);
      lines[i] = line;
    });
    return lines[0];
  }

  /**
   * Execute align command
   * 
   * @param {Editor} editor The editor to work on
   * @param {String} orientation The orientation of the alignment
   */
  function align(editor, orientation) {
    eachParagraph(editor, function(paragraph) {
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
   * @param {Editor} editor The editor to work on
   * @param {RegExp} r The regexp to search for
   */
  function scanForMatch(editor, r){
    var text = editor.textArea.val(),
    match = r.exec(text);
    if(r.lastIndex === 0){
      return;   // TODO escalate this return to break the caller too
    }
    while(r.lastIndex < editor.selectionStart){
      match = r.exec(text);
    }

    // needed for the replaceSelection call
    editor.setSelectionRange(r.lastIndex - match[0].length, r.lastIndex);

    return match;
  }

  /**
   * Toggle lists on and of
   *
   * @param {Editor} editor The editor to work on
   * @param {HTMLElement} target The clicked button
   * @param {String} bullet The bullet string e.g. '*'
   */
  function toggleList(editor, target, bullet){
    replaceEachLine(editor, "\n", function(lineStart, line){
      if(!/ on$/.test(target.className)){
        line = bullet + " " + line;
      }
      return line;
    });
  }

  /**
   * The available types of lists in Textile
   */
  var listTypes = {
    ul: '*',
    ol: '#'
  };

  /**
   * Handles enter inside lists, so that list are continued
   * 
   * @param {Editor} editor The editor to work on
   *
   * @returns {Boolean} Returns false to prevent the default browser behaviour
   */
  function pressedEnter(editor){
    var list = editor.currentNodes.list, replacement;

    if(list && /(u|o)l/i.test(list.tag)){ // only headings
      textileMode.getSelection(editor);
      if(ME.holdShift){
        replacement = " <br> ";
      } else {
        replacement = "\n" + listTypes[list.tag] + " ";
      }
      textileMode.replaceSelection(editor, replacement, false);
      return false;
    }
  }
  /**
   * @name textileMode
   * @namespace holds the methods from the textile mode
   * @augments Mode
   */
  textileMode = ME.addMode('textile', /** @scope textileMode.prototype */{
    /**
     * The long name of the mode
     * @property
     */
    name: "Textile Mode",
    /**
     * Holds the supported toolbaritems
     * @property
     */
    items: {
      "default": {
        /**
         * The default action for the buttons. With textile this works
         * for the same delimiters right and left
         *
         * @param {Editor} editor The editor to work on
         */
        clicked: function(editor, target) {
          // TODO find left and right boundaries that are valid
          var match, that = this;
          replaceEachLine(editor, " ", function(lineStart, line){
            if(/ on$/.test(target.className)){
              
              // first handle the left part
              match = line.match(that.leftRegExp);
              if(match){
                line = (match[1] || "") + line.slice(match[0].length);
              } else {
                // place delimiter left and extend selection
                line = that.delimiter + textileMode.extendLeftSelection(editor, /[ .]+/) + line;
              }

              // Then handle the right
              match = line.match(that.rightRegExp);
              if(match){
                line = line.slice(0, - match[0].length) + (match[1] || ""); 
              } else {
                line += textileMode.extendRightSelection(editor, / +/) + that.delimiter;
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
        clicked: function(editor) {
          align(editor, "left");
        }
      },
      alignRight: {
        clicked: function(editor) {
          align(editor, "right");
        }
      },
      alignCenter: {
        clicked: function(editor) {
          align(editor, "center");
        }
      },
      unorderedList: {
        clicked: function(editor, target) {
          toggleList(editor, target, "*");
        }
      },
      orderedList: {
        clicked: function(editor, target) {
          toggleList(editor, target, "#");
        }
      },
      link: {
        clicked: function(editor, target) {
          var dialog, callback, titleString, href, r, match;
          
          callback = {
            submit: function(title,uri){
              textileMode.replaceSelection(editor, "\"" + title + "\":" + uri);
            },
            remove: function(){
              textileMode.replaceSelection(editor, match[1]);
            },
            close: function(){
              textileMode.updatePreview(editor);
              editor.checkState();
            }
          };

          if(/ on$/.test(target.className)){
            dialog = ME.dialog.link(['Update','Remove','Cancel']);
            href = editor.currentNodes.a.attributes.href;

            match = scanForMatch(editor, new RegExp('\"([^\"]*)\":'+href,'g'));
            titleString = match[1];
            dialog.val('input.uri', href);
          }
          else {
            dialog = ME.dialog.link(['Create','Cancel']);
            titleString = firstLine(editor, " ");
          }
          
          if(!/^\s*$/.test(titleString)){
            dialog.val('.title', titleString);
          }
          
          dialog.dialog('open', callback);
        }
      },
      insertImage: {
        clicked: function(editor, target) {
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

              textileMode.replaceSelection(editor, replacement);
            },
            remove: function(){
              textileMode.replaceSelection(editor, "");
            },
            close: function(){
              textileMode.updatePreview(editor);
              editor.checkState();
            }
          };
          
          if(/ on$/.test(target.className)){
            dialog = ME.dialog.insertImage(['Update','Remove','Cancel']);
            src = editor.currentNodes.img.attributes.src;

            scanForMatch(editor, new RegExp('!' + src + "(\\([^\\)]*\\))?!(:[^ \n]*)?",'g'));
            
            if(editor.currentNodes.a){
              href = editor.currentNodes.a.attributes.href;
            }
            dialog.val('input.uri', href);
            dialog.val('input.imageUri', src);
            dialog.val('input.title', editor.currentNodes.img.attributes.title);
          }
          else {
            dialog = ME.dialog.insertImage(['Create','Cancel']);
            firstLine(editor, " ");
          }

          dialog.dialog('open', callback);
        }
      },
      formatBlock: {
        clicked: function(editor, target) {
          eachParagraph(editor, function(paragraph) {
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
     *
     * @param {Editor} editor The editor to work on
     */
    updatePreview: function(editor) {
      var html = textileCompiler.compile(editor.textArea.val());
      editor.htmlDiv.html(html);
    },
    /**
     * Convert preview div to textile
     * 
     * @param {Editor} editor The editor to work on
     *
     * @returns {String} A textile string
     */
    toText: function(editor, html) {
      if(!html){
        html = editor.htmlDiv.html();
      }

      /**
       * Fetch the regexps for the given tags and call the given
       * callback
       *
       * TODO get rid of the tags parameter?
       */
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
     * @param {Editor} editor The editor to work on
     *
     * @return {Object} An object representing the states
     */
    getSelectionStates: function(editor) {
      var paragraphs = this.getSelection(editor, "\n\n"),
      startTrace = editor.selectionStart - editor.boundaryStart,
      endTrace = editor.selectionEnd - editor.boundaryStart,
      trace = textileCompiler.trace(paragraphs, startTrace, endTrace);
      
      return this.buildStateObject(trace, editor.currentNodes = {});
    },
    /**
     * @param {Editor} editor The editor to work on
     *
     * @returns {String[]} An array of paragraphs
     */
    getParagraphs: function(editor) {
      return this.getSelection(editor, "\n\n").split(/\n\n+/);
    },
    /**
     * Set the paragraphs and move the caret
     * 
     * @param {Editor} editor The editor to work on
     * @param {String[]} paragraphs An array of paragraphs
     */
    setParagraphs: function(editor, paragraphs) {
      var text = editor.textArea.val();
      paragraphs = paragraphs.join("\n\n");

      if(editor.rightBoundary === -1) {
        editor.textArea.val(text.slice(0,editor.leftBoundary) + paragraphs);
      } else {
        editor.textArea.val(text.slice(0,editor.leftBoundary) + paragraphs + text.slice(editor.rightBoundary));
      }
      
      this.moveCaret(editor, paragraphs.length - editor.boundaryDistance);
    },
    /**
     * Move the caret by the given distance. Positive values move the caret to 
     * the right, negative to the left.
     * 
     * @param {Editor} editor The editor to work on
     * @param {Integer} distance The distance to move the caret
     */
    moveCaret: function(editor, distance) {
      // console.log("Moving caret: " + distance);
      var selectionStart = editor.selectionStart,
      startOfParagraphs = editor.startOfParagraphs;

      if(Math.abs(selectionStart - startOfParagraphs) > Math.abs(distance)) {
        selectionStart += distance;
      } else {
        selectionStart = startOfParagraphs;
      }
      
      editor.textArea.focus();
      editor.setSelectionRange(selectionStart, selectionStart);
    },
    /**
     * Handle special keyevents or standard keys that need fixing
     *
     * @param {Editor} editor The editor to work on
     * @param {Integer} keyCode
     */
    pressed: function(editor, keyCode){
      // console.log("pressed", keyCode);
      switch(keyCode){
      case 13: // enter
        return pressedEnter(editor, this);
      default: // handle keyCombos
        this.prototype.pressed.apply(this, [keyCode]);
      }
    }
  });
}