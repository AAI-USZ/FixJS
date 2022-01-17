function (){
  /**
   * @name Builder
   * 
   * The builder compiles the textile. It can also trace the common nodes between
   * a start and an end point.
   * 
   * Therefore it has two stacks: one for building and one for tracing
   */
  
  /**
   * Builds the html tree and traces the common nodes inside a
   * selection
   *
   * @name Builder
   * @namespace
   */
  var builder = (function (){
    var stack, tracingStack, stackPosition, traceJustStarted, traceJustEnded, popping, pointer, sP, eP, tracing, lastTrace, unsuccessfulPush = false, stringLength,
    ignoredTags = ['li'],
    definableAttributes = {
      img: ['title','src'],
      a: ['href']
    },
    delimiters = {
      i: "_",
      b: "*"
    };

    /**
     * Iterate over the attributes of the given tag and call the callback.
     * Used for comparison of the attributes of two nodes
     * 
     * @param {String} tag
     * @param {Function} callback
     */
    function iterateOverAttributes(tag, callback){
      var attributes = ['class'],i;
      if(definableAttributes[tag]){
        attributes = attributes.concat(definableAttributes[tag]);
      }
      for(i = attributes.length;i--;){
        callback(attributes[i]);
      }
    }
    
    /**
     * Test if the tracing stack can be moved down again with the
     * given node.
     * TODO give better name and document better
     * 
     * @param {TraceNode} targetNode The node to test
     * 
     * @returns {Boolean}
     */
    function canMoveStackDown(targetNode){
      var equalTag = true, key, equalAttributes = true, blockTag = (stackPosition == -1), stackNode, i, l;
      if(blockTag){
        // List nodes should be weaker than a paragraph node
        if(/(o|u)l/.test(tracingStack[0].tag)){
          if(/(o|u)l/.test(targetNode.tag) && targetNode.tag != tracingStack[0].tag){
            targetNode = {tag: 'p'};
          }
          stackNode = tracingStack[0] = targetNode;
        } else {
          stackNode = tracingStack[0];
        }
      } else {
        for(i = stackPosition + 1, l = tracingStack.length; i < l; i++ ){
          if(tracingStack[i].tag === targetNode.tag){
            stackNode = tracingStack[i];
            tracingStack[i] = tracingStack[stackPosition + 1];
            tracingStack[stackPosition + 1] = stackNode;
            break;
          }
        }
      }

      if(stackNode){
        // console.log("checking attributes");
        if(stackNode.attributes){
          iterateOverAttributes(stackNode.tag,function(key){
            // console.log("checking",key);
            if(stackNode.attributes[key] !== targetNode.attributes[key]){
              // console.log("difference in ", key, stackNode.attributes[key], targetNode.attributes[key]);
              equalAttributes = false;
              delete stackNode.attributes[key];
            }
          });
        }
        
      }
      // console.log("!@!@!@", stackNode, targetNode, equalAttributes);
      return stackNode && (blockTag || equalAttributes);
    }

    /**
     * Create a new TraceNode form a given node
     * @constructor
     * 
     * @param {object} node 
     */
    function TraceNode(node){
      this.tag = node.tag;
      this.attributes = node.attributes;
    }

    /**
     * Create a open-tag for the given node
     * 
     * @param {object} node
     * 
     * @return {String}
     */
    function htmlOpenTag(node){
      var attributeString = "";
      for(attr in node.attributes){
        if(node.attributes.hasOwnProperty(attr)){
          attributeString += " " + attr + "=\"" + node.attributes[attr] + "\"";
        }
      }
      return "<" + node.tag + attributeString + ">";
    }

    /**
     * Warning! this supposes, that there is only one instance of any tag in
     * the stack
     * 
     * @param {String} tag
     * 
     * @returns {Integer} The stack position of the given tag
     */
    function getStackPositionOf(tag){
      var i;
      for(i = stack.length;i--; ){
        if(stack[i].tag === tag){
          return i;
        }
      }
    }

    /**
     * Start the tracing
     */
    function startTrace(){
      var length = stack.length, i, numberOfIgnoredTags = 0;
      // console.log("################################## startTrace");
      tracing = true;
      traceJustStarted = true;
      for(i=1;i<length;i++){
        // console.log(stack[i].tag);
        if(ignoredTags.indexOf(stack[i].tag) == -1){
          tracingStack[i-1 - numberOfIgnoredTags] = new TraceNode(stack[i]);
        } else {
          numberOfIgnoredTags += 1;
        }
      }
      // console.log(tracingStack.length);
      stackPosition = tracingStack.length -1;
    }
    
    /**
     * End the tracing
     */
    function endTrace(){
      // console.log("#################################### endTrace");
      // console.log(tracingStack.length);
      lastTrace = false;
      tracing = false;
    }

    /**
     * @lends Builder
     */
    return {
      /**
       * Initialize Builder for normal operation
       */
      init: function(){
        stack = [{content:""}];
      },
      /**
       * Initialize Builder for tracing operation
       */
      initTrace: function(startPosition, endPosition, lengthOfString){
        tracingStack = [];
        tracing = undefined;
        pointer = 0;
        sP = startPosition;
        eP = endPosition;
        // console.log(sP, eP);
        stringLength = lengthOfString;
      },
      /**
       * Definitly ends the trace
       */
      finalizeTrace: function(){
        if(tracing){
          endTrace();
        }
        // If the tracingstack is empty, add a default node to it
        if(!tracingStack[0]){
          tracingStack[0] = {tag: 'p'};
        }
      },
      /**
       * Advance the pointer by the given amount.
       * Handles starting and ending of the trace
       * 
       * @param {Integer} advanceAmount
       * @param {Boolean} forceEndTrace wether to forcably end the trace
       */
      advancePointer: function(advanceAmount, forceEndTrace){
        pointer += advanceAmount;
        // console.log("pointer",pointer,"startPointer", sP, "endPointer", eP);
        if(tracing === undefined && (pointer > sP || pointer == stringLength)){
          startTrace();
        }
        if(tracing && pointer > eP){
          if(lastTrace || forceEndTrace){
            // console.log("forcefully end trace");
            endTrace();
          } else {
            // console.log("set last trace");
            lastTrace = true;
          }
        }
      },
      /**
       * Push a tag to the build stack
       * 
       * @param {String} tag
       * @param {Object} attributes
       */
      pushTag: function(tag, attributes){
        var node = {tag: tag,
                    attributes: attributes || {},
                    content: ""};
        // console.log("open tag", node);
        stack.push(node);
        if(tracing && ignoredTags.indexOf(tag) == -1){
          if(traceJustStarted){
            // console.log("inserting node ", node);
            tracingStack[stackPosition+1] = new TraceNode(node);
            stackPosition += 1;
          }
          else if(tracingStack[stackPosition+1]){
            if(canMoveStackDown(node)){
              stackPosition += 1;
            } else {
              unsuccessfulPush = true;
            }
          }
          // console.log("stackPosition " + stackPosition);
        }
      },
      /**
       * Push a tag to the build stack unless the tag is already open
       *
       * @param {String} tag The tag to push on top of the stack
       */
      pushTagUnlessOpen: function(tag){
        if(this.isOpen(tag)){
          this.pushString(delimiters[tag]);
        } else {
          this.pushTag(tag);
        }
      },
      /**
       * Close a tag. If a tag is given find it and close it. Otherwise the top
       * tag is closed
       * 
       * @param {String} [tag]
       */
      closeTag: function(tag){
        var removedNode, i;
        if(tag){
          i = getStackPositionOf(tag);
          removedNode = stack.splice(i,1)[0];
        } else {
          removedNode = stack.pop();
        }

        // console.log("closing", removedNode);
        if(tracing && ignoredTags.indexOf(tag) == -1){
          traceJustStarted = false;
          if(unsuccessfulPush){
            // console.log("slicing because of difference "+stackPosition);
            tracingStack = tracingStack.slice(0,stackPosition+1);
            unsuccessfulPush = false;
          }
          // console.log(tracingStack, stackPosition, removedNode);
          if(tracingStack[stackPosition].tag === removedNode.tag){
            // console.log("moving down");
            stackPosition -= 1;
            // console.log("stackPosition " + stackPosition);
          }
          popping = true;
        }

        // The part of the content, which belongs exclusively to the
        // current tag must be commited
        this.pushString(htmlOpenTag(removedNode) + removedNode.content, stack[i-1]);
        // The tag needs to be closed at the top, where the current string insertion occurs
        this.pushString("</"+removedNode.tag+">"); 
        popping = false;
      },
      /**
       * Close a tag if the tag is open. If its not open push the
       * String to the top node of the stack
       *
       * @param {String} tag The tag to close
       * @param {String} before The string before the tag identifier
       * @param {String} after The string after the tag identifier,
       * which is still mached to ensure valid markup. Normally its
       * whitespace
       */
      closeTagIfOpen: function (tag, before, after) {
        before = before || "";
        after = after || "";
        if(this.isOpen(tag)){
          this.pushString(before);
          this.closeTag(tag);
          this.pushString(after);
        } else {
          this.pushString(before + delimiters[tag] + after);
        }
      },
      /**
       * Closes all textile markup that ends at a line break.
       * For example "*" or "_"
       */
      popLineEnd: function(){
        var surpressLineBreak = false, partialMarkup = {b: "*", i: "_"}, node;
        // If the need arises to search deeper think of the correct
        // order in which to append the content
        while("a,i,b,li".indexOf(stack[stack.length - 1].tag) != -1){
          if("li" === stack[stack.length-1].tag){
            this.closeTag();
            surpressLineBreak = true;
          } else {
            node = stack.pop();
            this.pushString(partialMarkup[node.tag]+node.content);
          }
        }
        return surpressLineBreak;
      },
      /**
       * Closes all open tags
       */
      popParagraphEnd: function(){
        while(stack.length > 1){
          this.closeTag();
        }
      },
      /**
       * Add a string to the given node or the top node.
       * 
       * @param {String} string
       * @param {Object} [node] defaults to the top node in the stack
       */
      pushString: function(string, node){
        if(!node){
          node = stack[stack.length - 1];
        }
        node.content += string;
        // console.log("pushing", string, "to", node);
        if(!/^([ ]+|<br\/>)?$/.test(string)){ // Ignore whitespace
          // during tracing
          if(traceJustStarted){
            traceJustStarted = false;
          }
          if(tracing && !popping && tracingStack[stackPosition+1]){
            // console.log("cutting because of String " + stackPosition);
            // console.log(tracingStack.length);
            tracingStack = tracingStack.slice(0,stackPosition + 1);
            // console.log(tracingStack.length);
          }
        }
      },
      /**
       * Check if the given tag is open
       * 
       * @param {String} tag
       * 
       * @returns {Boolean}
       */
      isOpen: function(tag){
        // console.log("check is Open", tag, stack.length);
        return typeof getStackPositionOf(tag) === 'number';
      },
      blockTagIsOpen: function(){
        return !!stack[1];
      },
      closeBlockTag: function(){
        while(stack[1]){
          this.closeTag();
        }
      },
      /**
       * @returns {Object} The trace stack
       */
      getTrace: function(){
        return tracingStack;
      },
      /**
       * @returns {String} The compiled html
       */
      toHtml: function(){
        // console.log(stack);
        return stack[0].content;
      }
    };
  })();

  var text;
  
  function advance(regexp){
    var match = regexp.exec(text),whitespaceLength, matchLength;
    if(match){
      whitespaceLength = /^\s*/.exec(match[0])[0].length;
      matchLength = match[0].length;
      if(whitespaceLength){
        // console.log("whitespace");
        builder.advancePointer(whitespaceLength, true);
      }
      if(matchLength - whitespaceLength){
        builder.advancePointer(matchLength - whitespaceLength);
      }
      // console.log("@@@@ matched: ", match, regexp);
      text = text.slice(matchLength);
      return match || true;
    }
  }
  function next(regexp){
    return regexp.test(text);
  }
  
  function parseParagraphs(){
    var match;
    while(!/^\s*$/.test(text)){
      match = advance(/^\s*(h\d|p|bq)(\(([^#\)]*)(#[^\)]+)?\))?\. /);
      if(match){
        var attributes = {};
        if(match[3]){
          attributes["class"] = match[3];
        }
        if(match[4]){
          attributes.id = match[4];
        }

        builder.pushTag(match[1], attributes);
      }
      parseLines();
      builder.popParagraphEnd();
    }
  }
  
  function parseLines(){
    while(!advance(/^\n/) && !next(/^\s*$/)){ // check for a double linebreak
      parseLineStart();
    }
  }
  
  function parseLineStart(){
    var match;
    if(advance(/^ *\* /)){
      if(!builder.isOpen("ul")){ // this won't work for nested uls,
        // solve with lookahead
        builder.closeBlockTag();
        builder.pushTag("ul");
      }
      builder.pushTag("li");
    } else if(advance(/^ *# /)){
      if(!builder.isOpen("ol")){ // this won't work for nested uls
        builder.closeBlockTag();
        builder.pushTag("ol");
      }
      builder.pushTag("li");
    } else {
      while(builder.isOpen("ul") || builder.isOpen("ol")){
        builder.closeTag();
      }
      if(!builder.blockTagIsOpen()){
        builder.pushTag("p");
      }
    }
    // Eat Whitespace at the beginning of the Line after the tag
    // TODO remove this and eat the whitespace at the beginning of
    // each regexp
    match = advance(/^ */);
    builder.pushString(match[0]);
    parseLine();
  }

  function parseLine(){
    var match, surpressLineBreak;
    while(true){
      // Italic start
      if(match = advance(/^_(?=[^ \n]+)/)){
        builder.pushTagUnlessOpen("i");
      }
      // bold start
      else if(match = advance(/^\*(?=[^ \n]+)/)){
        builder.pushTagUnlessOpen("b");
      }
      // italic end
      else if(match = advance(/^([^ \n"\*]+)_([\*]*)( +|(?=\n|$))/)){
        builder.closeTagIfOpen("i", match[1]);
        if(match[2]){
          builder.closeTagIfOpen('b');
        }
        builder.pushString(match[3]);
      }
      // bold end
      else if(match = advance(/^([^ \n"_]+)\*([_]*)( +|(?=\n|$))/)){
        builder.closeTagIfOpen("b", match[1]);
        if(match[2]){
          builder.closeTagIfOpen('i');
        }
        builder.pushString(match[3]);
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
        surpressLineBreak = builder.popLineEnd();
        
        if(surpressLineBreak){
          // close list/table if next line doesn't continue the
          // list/table
          if((builder.isOpen('ul') && !next(/^ *\*+/)) ||
             (builder.isOpen('ol') && !next(/^ *#+/))){
            builder.closeTag();
          }
        } else if(next(/^ *(\||[\*#] )/)){
          // TODO check table format, needs | a space, like the list tags
          // close current block tag if next line defines a table/list
          builder.closeTag();
        } else if(!next(/^ *(\n|$|[\*#] )/)){
          builder.pushString("<br/>");
        }
        return;
      }
    }
  }

  /**
   * The Compiler for textile
   *
   * @name textileCompiler
   * @namespace
   */
  textileCompiler = {
    /**
     * Compile the given text to html
     *
     * @param {String} textToCompile A textile string
     *
     * @returns {String} The html
     */
    compile: function(textToCompile){
      builder.init();
      text = textToCompile;
      parseParagraphs();
      return builder.toHtml();
    },
    /**
     * Trace the common nodes between the given boundaries
     *
     * @param {String} textToCompile A textile string
     * @param {Integer} startTrace Index of textToCompile where to
     * start the trace
     * @param {Integer} endTrace Index of textToCompile where to
     * end the trace
     *
     * @returns {Object} A stack of the common nodes
     */
    trace: function(textToCompile, startTrace, endTrace){
      builder.initTrace(startTrace, endTrace, textToCompile.length);
      this.compile(textToCompile);
      builder.finalizeTrace();
      return builder.getTrace();
    }
  };
}