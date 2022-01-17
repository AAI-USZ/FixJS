function() {
  var wysiwygMode,
  $ = jQuery,
  selection = getSelection(), range = document.createRange();

  function startNode(){
    return jQuery(selection.getRangeAt(0).startContainer);
  }
  
  function endNode(){
    return jQuery(selection.getRangeAt(0).endContainer);
  }
  
  function lastParentBeforePreview(node){
    if(node.parent().is(".preview")){
      return node;
    } else {
      return node.parentsUntil(".preview").last();
    }
  }
  
  function getParagraphs() {
    var anchor, focus, paragraphs, matchIndex = -1;

    anchor = lastParentBeforePreview(startNode());
    focus = lastParentBeforePreview(endNode())[0];
    
    if(anchor[0] !== focus){
      paragraphs = anchor.nextAll().filter(function(i){
        if(this == focus){
          matchIndex = i;
        }
        if(matchIndex === -1 || matchIndex === i){
          return true;
        }
      }).add(anchor);
    } else {
      paragraphs = anchor;
    }

    return paragraphs;
  }
  
  function align(direction) {
    getParagraphs().removeClass("left")
      .removeClass("right").removeClass("center")
      .addClass(direction);
  }

  function selectNodes(nodes,collapse){
    var firstNode = nodes[0], lastNode;
    if(nodes.length > 1){
      lastNode = nodes[nodes.length-1];
      range.setStart(firstNode,0);
      range.setEnd(lastNode,lastNode.childNodes.length);
    } else {
      range.selectNodeContents(firstNode);
    }

    if(collapse !== undefined){
      range.collapse(collapse);
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * @param {Editor} editor The editor to work on
   */
  function handleList(editor, target, listType){
    var contents, lines, $p, $list;
    
    if(/ on$/.test(target.className)){
      disableList(editor);
    } else {
      contents = wysiwygMode.getSelection(editor, 'br');
      
      $list = $("<" + listType + ">");
      createList($list, contents.firstChild);

      joinAdjacentList(editor.leftBorder, $list);
      joinAdjacentList(editor.rightBorder, $list);

      wysiwygMode.replaceSelection(editor, $list);
    }
  }

  /**
   * @param {Editor} editor The editor to work on
   */
  function disableList(editor){
    // get list items and detach them from the dom
    contents = wysiwygMode.getSelection(editor, 'li');

    lines = [];
    // insert their contents into a paragraph tag and seperate
    // them by and <br>
    addListItems(lines, contents.firstChild);
    $p = $("<p>").html(lines.join("<br>"));

    wysiwygMode.replaceSelection(editor, $p);
  }

  /**
   * Create a new Border with the following properties
   *
   * @property {String} nextProperty The property wich holds the next
   * sibling
   * @property {jQuery} ancestors
   * @property {HTMLElement} block
   * @property {HTMLElement} safeBlock
   * @property {HTMLElement} borderNode
   * Is null when border node is not found. That means the node has no
   * more siblings
   * @property {HTMLElement} node
   * Equals borderNode if it exists, otherwise its the last sibling
   *
   * @param {HTMLElement} node
   * @param {String} borderType The nodeName of the border node
   * @param {String} nextProperty The property wich holds the next sibling
   * @constructor
   */
  function Border(node, borderType, nextProperty){
    this.nextProperty = nextProperty;
    this.ancestors = node.parentsUntil(".preview");
    this.block = this.ancestors[this.ancestors.length - 1] || node[0];
    this.borderNode = this.ancestors[this.ancestors.length -2] || node[0];
    while(this.borderNode){
      this.node = this.borderNode;
      if(!borderType || this.borderNode.nodeName.toLowerCase() === borderType){
        break;
      }
      this.borderNode = this.borderNode[nextProperty];
    }
    this.safeBlock = this.borderNode ? this.block : this.block[nextProperty];
  }

  /**
   * Create list items from node and it siblings and join them to the
   * given list
   *
   * @param {HTMLElement} list
   * @param {HTMLElement} node
   */
  function createList(list, node){
    var li = document.createElement("li"), next;
    
    function pushItem(){
      if(!/^\s*$/.test(li.textContent)){
        list.append(li);
      }
      li = document.createElement('li');
    }

    while(node !== null){
      next = node.nextSibling;
      if(/br/i.test(node.nodeName)){
        pushItem();
      } else if(/(p|h\d)/i.test(node.nodeName)) {
        pushItem();
        createList(list, node.firstChild);
      } else if(/(o|u)l/i.test(node.nodeName)) {
        pushItem();
        $(node).children().appendTo(list);
      } else if(/li/i.test(node.nodeName)) {
        pushItem();
        list.append(node);
      } else {
        li.appendChild(node);
      }
      node = next;
    }
    pushItem();
  }

  /**
   * Add the items of an adjcent list node defined by border to the
   * list.
   *
   * @param {Border} border
   * @param {HTMLElement} list
   */
  function joinAdjacentList(border, list){
    var children;
    if(border.safeBlock && /ul/i.test(border.safeBlock.nodeName)){
      next = border.safeBlock[border.nextProperty];

      children = $(border.safeBlock).remove().children();
      if(border.nextProperty === 'previousSibling'){
        children.prependTo(list);
      } else {
        children.appendTo(list);
      }
      border.safeBlock = next;
    }
  }

  /**
   * Add the items of an (un)ordered list to the given lines array
   *
   * @param {String[]} lines
   * @param {HTMLElement} node The list node
   */
  function addListItems(lines,node){
    while(node){
      if(/(o|u)l/i.test(node.nodeName)) {
        addListItems(lines, node.firstChild);
      } else if(/li/i.test(node.nodeName)) {
        lines.push(node.innerHTML);
      }
      node = node.nextSibling;
    }
  }


  /**
   * Check the position of the caret and adjust the container the
   * caret is in when necessary
   *
   * @param {Integer} adjustment Adjust the current offset (needed for
   * arrow keys
   */
  function checkCaret(adjustment){
    var range = selection.getRangeAt(0),node, text;
    function checkSibling(property, collapse){
      while(!node[property]){
        node = node.parentNode;
      }
      node = node[property];
      if(node && !/br|h\d|p/i.test(node.nodeName)){
        selectNodes([node], collapse);
        return false;
      }
    }
    if(range.collapsed){
      node = range.startContainer;
      if(node.nodeType == 3){ // Its a textnode
        text = node.nodeValue;
        if(range.startOffset + adjustment === 0 && /^ /.test(text)){
          return checkSibling('previousSibling', false);
        } else if(range.startOffset + adjustment === node.length && / $/.test(text)){
          return checkSibling('nextSibling', true);
        }
      }
    }
  }

  /**
   * @browserbug Firefox and Chrome
   */
  function pressedEnter(htmlDiv){
    if(checkIfDeletedAll(htmlDiv,13) === false){
      return false;
    }
    var lastSibling = true, node, range, endContainer,
    block = editor.currentNodes.block;

    if(/h[1-5]/i.test(block.nodeName)){ // only headings
      range = selection.getRangeAt(0);
      node = endContainer = range.endContainer;

      // only the last sibling
      while(node.parentNode !== htmlDiv[0]){
        if(node.nextSibling){
          lastSibling = false;
          break;
        }
        node = node.parentNode;
      }
      
      if(lastSibling
         && range.endOffset === endContainer.textContent.length // at
         // the end
        ){
        node = $("<p>").insertAfter(block);
        selectNodes(node);
        return false;
      }
    }
  }

  /**
   * Handle the backspace key within lists and fixes a bug in Chrome.
   *
   * @browserbug Chrome
   * Chrome tries to keep the styles whilst backspacing from say a
   * paragraph to a heading. The content of the paragraph looks like a
   * paragraph, but is a heading
   *
   * @param {Editor} editor The editor to work on
   */
  function pressedBackspace(editor, htmlDiv){
    if(checkIfDeletedAll(htmlDiv,8) === false){
      return false;
    }
    var children, atBeginningOfLI,
    inFirstSibling = true,
    block = editor.currentNodes.block,
    list = editor.currentNodes.list,
    prev = (list || block).previousSibling,
    range = selection.getRangeAt(0),
    node = range.startContainer;

    if(!range.collapsed || !prev || range.startOffset !== 0){
      return true;
    }

    // only the first sibling
    while(node.parentNode !== htmlDiv[0]){
      if(node.previousSibling){
        inFirstSibling = false;
        if(/li/i.test(node.nodeName)){
          atBeginningOfLI = true;
        } else {
          return true;
        }
        break;
      }
      node = node.parentNode;
    }

    if(inFirstSibling){
      if(list){
        node = node.firstChild;
      }
      node = $(node);
      children = node.contents();

      $(prev).append(children);
      node.remove();
      selectNodes([children[0]], true);
    } else if(list && atBeginningOfLI){
      disableList(editor);
    }
    
    return false;
  }

  /**
   * @browserbug Chrome
   * bring Chrome to a normal behaviour
   *
   * @param {Editor} editor The editor to work on
   */
  function pressedDelete(editor, htmlDiv){
    if(checkIfDeletedAll(htmlDiv,46) === false){
      return false;
    }
    if(!$.browser.webkit){
      return true;
    }
    var children,
    block = editor.currentNodes.block,
    list = editor.currentNodes.list,
    next = (list || block).nextSibling,
    range = selection.getRangeAt(0),
    node = range.startContainer;

    if(!range.collapsed || !next || range.startOffset !== node.length){
      return true;
    }

    // only the first sibling
    while(node.parentNode !== htmlDiv[0]){
      if(node.nextSibling){
        return true;
      }
      node = node.parentNode;
    }

    if(list){
      // append to last list item
      node = node.lastChild;
    }
    if(/(u|o)l/i.test(next.nodeName)){
      // swallow only the first list item
      next = next.firstChild;
    }
    next = $(next);
    children = next.contents();

    $(node).append(children);
    next.remove();

    return false;
  }

  /**
   * @browserbug Firefox
   */
  function checkIfDeletedAll(htmlDiv, keyCode, holdNeutralKey){
    var range = selection.getRangeAt(0);
    if(!$.browser.mozilla || holdNeutralKey || range.collapsed || ME.util.isNeutralKey(keyCode)){
      return true;
    }
    var node, content;
    content = range.extractContents();
    // The second check is necessary, because extractContents might
    // leave some empty tags when you manually select the whole div
    // (the selection is always inside the block tags)
    if(htmlDiv.is(":empty") || /^ *$/.test(htmlDiv.text())){
      node = document.createElement(content.childNodes[0].nodeName);
      htmlDiv.html(node);
      selectNodes([node]);
      if(!/^8|13|46$/.test("" + keyCode)){
        // Pass non special keystrokes upwards
        return true;
      } else {
        return false;
      }
    }
  }

  /** 
   * @name wysiwygMode
   * @namespace
   * @augments Mode
   */
  wysiwygMode = ME.addMode('wysiwyg', /** @scope wysiwygMode.prototype */{
    /**
     * The long name of the mode
     * @property
     */
    name: "Preview Mode",
    /**
     * Holds the supported toolbaritems
     * @property
     */
    items: {
      "default": {
        clicked: function(editor, target) {
          document.execCommand(this.name, false, null);
        }
      },
      bold: {
        tag: 'b'
      },
      italic: {
        tag: 'i'
      },
      alignLeft: {
        clicked: function(){
          align('left');
        }
      },
      alignRight: {
        clicked: function(){
          align('right');
        }
      },
      alignCenter: {
        clicked: function(){
          align('center');
        }
      },
      unorderedList: {
        clicked: function(editor, target){
          handleList(editor, target, 'ul');
        }
      },
      orderedList: {
        clicked: function(editor, target){
          handleList(editor, target, 'ol');
        }
      },
      link: {
        clicked: function(editor, target) {
          var dialog, linkNode, titleString,
          range = selection.getRangeAt(0),
          callback = {
            remove: function(){
              var text = linkNode.text();
              // on Chrome childNodes does not contain textnodes
              linkNode.replaceWith(text);
            },
            close: function(){
              editor.htmlDiv.focus();
              editor.checkState();
            }
          };
          
          if(/ on$/.test(target.className)){
            linkNode = $(editor.currentNodes.a);
            dialog = ME.dialog.link(['Update','Remove','Cancel']);
            
            callback.submit = function(title,uri){
              linkNode.attr('href',uri).text(title);
              
              // Firefox start
              range.selectNodeContents(linkNode[0]);
              selection.removeAllRanges();
              selection.addRange(range);
              // Firefox end
            };
            titleString = linkNode.text();
            dialog.val('input.uri', linkNode.attr('href'));
          }
          else {
            dialog = ME.dialog.link(['Create','Cancel']);
            
            callback.submit = function(title,uri){
              var newNode = $("<a href=\"" + uri + "\">" + title + "</a>")[0];
              range.deleteContents();
              range.insertNode(newNode);
              
              range.selectNodeContents(newNode);
              selection.removeAllRanges();
              selection.addRange(range);
            };

            titleString = range.toString();
          }

          if(!/^\s*$/.test(titleString)){
            dialog.val('.title', titleString);
          }
          
          dialog.dialog('open', callback);
        }
      },
      insertImage: {
        clicked: function(editor, target) {
          var dialog, callback, linkNode,
          selection = window.getSelection(),
          range = selection.getRangeAt(0);

          callback = {
            submit: function(imageUri,title,uri){
              var imageNode = $("<img src=\"" + imageUri + "\"/>"), parentNode = imageNode;
              if(!/^\s*$/.test(title)){
                imageNode.attr({alt: title, title: title});
              }

              if(!/^\s*$/.test(uri)){
                parentNode = $("<a href=\"" + uri + "\"/>").append(imageNode);
              }
              
              range.deleteContents();
              range.insertNode(parentNode[0]);
              
              range.selectNode(imageNode[0]);
              selection.removeAllRanges();
              selection.addRange(range);
            },
            remove: function(){
              imageNode.remove();
            },
            close: function(){
              editor.htmlDiv.focus();
              editor.checkState();
            }
          };

          if(/ on$/.test(target.className)){
            dialog = ME.dialog.insertImage(['Update','Remove','Cancel']);
            if(editor.currentNodes.a){
              linkNode = $(editor.currentNodes.a);
              dialog.val('input.uri', linkNode.attr('href'));
              range.selectNode(editor.currentNodes.a);
            }
            imageNode = $(editor.currentNodes.img);

            dialog.val('input.imageUri', imageNode.attr('src'));
            dialog.val('input.title', imageNode.attr('title'));
          }
          else {
            dialog = ME.dialog.insertImage(['Create','Cancel']);
          }

          dialog.dialog('open', callback);
        }
      },
      formatBlock: {
        clicked: function(editor, target) {
          var paragraph, newParagraphs = [], tag;

          getParagraphs().replaceWith(function(){

            if(/(u|o)l/i.test(this.nodeName)){ // ignore lists
              // TODO update jquery and try returning the list. File
              // bug when it won't work
              tag = this.nodeName;
            } else {
              tag = target.value;
            }
            paragraph = $('<' + tag + '>')
              .addClass(this.className).append(this.childNodes);
            newParagraphs.push(paragraph[0]);
            return paragraph;
          });
          selectNodes(newParagraphs);
        }
      }
    },
    /**
     * Detach the selected Nodes from the dom and return them
     *
     * @param {Editor} editor The editor to work on
     * @param {String} nodeType The type of node to which the border of
     * the selection will be extended
     *
     * @returns {HTMLFragment} The selected nodes
     */
    getSelection: function(editor, nodeType){
      var range = selection.getRangeAt(0);

      editor.collapsed = range.collapsed;

      editor.leftBorder = new Border(startNode(), nodeType, 'previousSibling');
      editor.rightBorder = new Border(endNode(), nodeType, 'nextSibling');
      
      range.setStartBefore(editor.leftBorder.node);
      range.setEndAfter(editor.rightBorder.node);

      // split node if there are other nodes after the selection
      if(editor.rightBorder.borderNode){
        $(editor.rightBorder.borderNode).nextAll()
          .appendTo('<' + editor.rightBorder.block.nodeName + '>').parent()
          .insertAfter(editor.rightBorder.block);
      }

      return range.extractContents();
    },
    /**
     * Insert the given nodes into the DOM tree at the place where
     * getSelection extracted the nodes
     *
     * @param {Editor} editor The editor to work on
     * @param {HTMLFragment} nodes The nodes which will be inserted
     */
    replaceSelection: function(editor, nodes){
      if(editor.leftBorder.safeBlock){
        nodes.insertAfter(editor.leftBorder.safeBlock);
      } else {
        editor.htmlDiv.prepend(nodes);
      }
      
      if(editor.collapsed){
        selectNodes(nodes, true);
      } else {
        selectNodes(nodes);
      }
      
      // remove empty block tags
      // OPTIMIZE
      if(/^\s*$/.test(editor.leftBorder.block.textContent)){
        $(editor.leftBorder.block).remove();
      }
      if(/^\s*$/.test(editor.rightBorder.block.textContent)){
        $(editor.rightBorder.block).remove();
      }
    },
    /**
     * Executed after the mode has been activated.
     * Hides the textarea and set contenteditable
     *
     * @param {Editor} editor The editor to work on
     */
    afterActivation: function(editor) {
      editor.textArea.parent().hide();
      editor.htmlDiv.attr("contentEditable",true);

      // Force Mozilla to generate tags instead of inline styles
      if ($.browser.mozilla) {
        document.execCommand("styleWithCSS",null, false);
      }
    },
    /**
     * Get the State of the current selection (e.g. if a link is
     * selected) 
     *
     * @param {Editor} editor The editor to work on
     *
     * @returns {Object} An object representing the states
     */
    getSelectionStates: function(editor) {
      if(!$(document.activeElement).is(".preview")){
        return {};
      }

      function getParents(node, content){
        // TODO document me! why is this here?
        if(content){
          var contentNodeName = content.nodeName,
          nodeNodeName = node[0].nodeName;
          if(contentNodeName != "#text" && nodeNodeName != "#text" && nodeNodeName != contentNodeName){
            node = node.find(content.nodeName.toLowerCase());
          }
        }

        return node.parentsUntil(".preview").add(node);
      }
      
      var nodes = [], startNodes, endNodes,
      content = selection.getRangeAt(0).cloneContents().firstChild;

      startNodes = getParents(startNode(), content);
      endNodes = getParents(endNode(), content);

      if(/(u|o)l/i.test(startNodes[0].nodeName) && startNodes[0].nodeName !== endNodes[0].nodeName){
        nodes = startNodes.toArray();
        nodes[0] = $('<p>')[0];
      } else {
        nodes = startNodes;
      }
      return this.buildStateObject(nodes, editor.currentNodes = {});
    },
    /**
     * Executed if the htmlDiv of the Editor is clicked.
     * Checks where the Caret has been placed by the browser
     */
    clicked: function(){
      checkCaret(0);
    },
    /**
     * Handle special keyevents or standard keys that need fixing
     *
     * @param {Editor} editor The editor to work on
     * @param {Integer} keyCode
     *
     * @returns {Boolean} If false is returned, the default action is
     * prevented
     */
    pressed: function(editor, keyCode){
      this.prototype.pressed.apply(this, [editor, keyCode]);
      switch(keyCode){
      case 13: // enter
        return pressedEnter(editor.htmlDiv);
      case 8: // Backspace
        return pressedBackspace(editor, editor.htmlDiv);
      case 46: // Delete
        return pressedDelete(editor, editor.htmlDiv);
      case 37: // left arrow
        return checkCaret(-1);
      case 39: // right arrow
        return checkCaret(1);
      default:
        return checkIfDeletedAll(editor.htmlDiv, keyCode, this.holdNeutralKey);
      }
    },
    /**
     * @param {Editor} editor The editor to work on
     *
     * @returns {String} The text representation of the preview
     * mode. Depends on the current data mode.
     */
    toText: function(editor) {
      return editor.getDataMode().toText(editor);
    },
    /**
     * @param {Editor} editor The editor to work on
     *
     * @returns {String} The html behind the preview
     */
    toHTML: function(editor) {
      return editor.htmlDiv.html();
    }
  });
}