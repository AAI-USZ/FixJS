function ($) {
  var globalSettings = {}, availableModes = {}, toolbarItems = {}, toolbarHTML = "",
  availableItems = ['bold','italic','alignLeft','alignCenter','alignRight','unorderedList','orderedList','link','insertImage','save','wysiwyg','close','changeDataMode','formatBlock'],
  globalItems = [],
  emptyFunction = $.noop,
  // keep the editors for things like checking which needs saving,
  // which has focus etc.
  activeEditors = [],
  numberOfEditors = 0,
  focusedEditor;

  /**
   * Create a new Mode
   * @constructor
   * @name Mode
   * @param {Object} customFunctions these functions will be added to the Mode object
   */
  function Mode(customFunctions){
    $.extend(this, customFunctions);
    // allow direct access of prototype methods from the mode instances
    this.prototype = Mode.prototype;
  }
  
  Mode.prototype = /** @scope Mode.prototype */ {
    /**
     * The default pressed function to handle key combos (shift + x)
     *
     * @param {Editor} editor The editor to work on
     */
    pressed: function(editor, keyCode){
      if(keyCode === 16){
        ME.holdShift = true;
      }
      if(ME.util.isNeutralKey(keyCode)){
        ME.holdNeutralKey = true;
      }
    },
    /**
     * Handle special keys (shift press) to deal with key combos
     *
     * @param {Editor} editor The editor to work on
     */
    released: function(editor, keyCode){
      if(keyCode === 16){
        ME.holdShift = false;
      }
      if(ME.util.isNeutralKey(keyCode)){
        ME.holdNeutralKey = false;
      }
    },
    /**
     * Handle clicks on the textarea or html div
     *
     * @function
     */
    clicked: emptyFunction,
    /**
     * Activate this mode for the editor
     *
     * @param {Editor} editor The editor to work on
     */
    activate: function(editor, callback) {
      if(editor.preview.is(":empty")) {
        this.updatePreview(editor, callback);
      } else {
        this.updateTextArea(editor, callback);
      }
      editor.toolbar.loadModeToolbar(editor);
    },
    /**
     * Update the preview html div with the html representation of the
     *mode
     * CONSIDER move to editor
     *
     * @param {Editor} editor The editor to work on
     */
    updatePreview: function(editor, callback) {
      var html;
      if(this.toHTML){
        console.log("updating preview in Mode " + this.id);

        html = this.toHTML(editor, callback);
        if(html !== undefined){
          editor.preview.html(html || "<p>&nbsp;</p>");
          
          if(callback){
            callback();
          }
        }
      } else if(callback){
        callback();
      }
    },
    /**
     * Update the textarea with the text representation of the mode
     *
     * @param {Editor} editor The editor to work on
     */
    updateTextArea: function(editor, callback) {
      var text, dialogProxy;
      if(this.toText && (!editor.oldMode || editor.oldMode.toHTML)){
        console.log("updating TA in Mode " + this.id);

        text = this.toText(editor, callback);
        if(text !== undefined){
          editor.textArea.val(text);
          
          if(callback){
            callback();
          }
        }
      } else {
        if(callback){
          callback();
        }
      }
    },
    /**
     * Run after activation. Default behaviour for text modes. wysiwyg mode has 
     * its own version
     *
     * @param {Editor} editor The editor to work on
     */
    afterActivation: function(editor) {
      var preview = editor.preview;
      editor.textArea
        .parent().show()
        .find(":first-child").focus()[0]
        .setSelectionRange(0,0);
      editor.dataType = this.id;
      preview.attr("contentEditable",false);
      if(this.toHTML){
        preview.show();
      } else {
        preview.hide();
      }
    },
    /**
     * Get a state object which sets defines the states of the buttons
     * and the selects.
     *
     * @param {Editor} editor The editor to work on
     * @returns {Object} an object that describes the states
     */
    getStates: function(editor){
      var states = this.getSelectionStates(editor);
      if(this.id === 'wysiwyg'){
        states.wysiwyg = true;
        states.changeDataMode = editor.dataType;
      } else {
        states.changeDataMode = this.id;
      }
      return states;
    },
    /**
     * Get the state of the current selection. This is a placeholder.
     * Each mode should define its version
     *
     * @see Toolbar#getStates
     * @api
     *
     * @param {Editor} editor The editor to work on
     * 
     * @returns {Object} an object that describes the states
     */
    getSelectionStates: function(editor){
      return {};
    },
    /**
     * A helper function that builds a state object from the given
     * nodes, that defines the active buttons
     * 
     * CONSIDER make currentNodes a property
     * @param {Array} nodes The active nodes (e.g. a,li). The highest node is on the right
     * @param {Object} currentNodes A reference that will be filled with important nodes (e.g. a) to be used by the mode
     * 
     * @returns {Object} The state object
     */
    buildStateObject: function(nodes, currentNodes){
      function getTag(node){
        return node.tag ? node.tag : node.nodeName.toLowerCase();
      }
      var node, i = nodes.length, states = {};
      while(i--){
        node = nodes[i];
        switch (getTag(node)){
        case "a":
          currentNodes.a = node;
          states.link = true;
          break;
        case "img":
          currentNodes.img = node;
          states.insertImage = true;
          break;
        case "i":
          states.italic = true;
          break;
        case "b":
          states.bold = true;
          break;
        case "ol":
          states.orderedList = true;
          states.unorderedList = false;
          states.formatBlock = 'disable';
          states.alignLeft = 'disable';
          states.alignRight = 'disable';
          states.alignCenter = 'disable';
          currentNodes.list = node;
          break;
        case "ul":
          states.orderedList = false;
          states.unorderedList = true;
          states.formatBlock = 'disable';
          states.alignLeft = 'disable';
          states.alignRight = 'disable';
          states.alignCenter = 'disable';
          currentNodes.list = node;
          break;
        case "li":
          break;
        default:
          states.formatBlock = getTag(node);
          currentNodes.block = node;
          break;
        }
      }
      return states;
    },
    /**
     * @param {Editor} editor The editor to work on
     *
     * @returns {Boolean} True if the cursor is at the beginning of
     * the line
     */
    atBeginningOfLine: function(editor){
      var text = editor.textArea.val();
      return text[editor.selectionStart-1] === "\n";
    },
    /**
     * Get the selection. If a boundary is given, returned string is
     * extended to this boundary. The selection itself is not extended.
     *
     * @param {Editor} editor The editor to work on
     * @param {String} [boundary] The right and left boundary the
     * selection should be extended to
     *
     * @returns {String} The currently selected string
     */
    getSelection: function(editor, boundary) {
      var boundaryPosition, subString, outerLimit, outerLimitLength, searchLimit, boundaryStart, boundaryEnd, selectionEnd, selectionStart,
      textArea = editor.textArea,
      text = textArea.val();
      textArea.focus();

      editor.initSelectionProperties(text);
      selectionEnd = editor.selectionEnd;
      selectionStart = editor.selectionStart;

      if(boundary) {
        if(boundary.indexOf('\n') === -1){
          outerLimit = "\n";
        } else {
          outerLimit = "\n\n";
        }
        outerLimitLength = outerLimit.length;

        // find left boundary
        searchLimit = selectionStart - outerLimit.length;
        boundaryPosition = Math.max(text.lastIndexOf(boundary, searchLimit), text.lastIndexOf(outerLimit, searchLimit));
        if(boundaryPosition !== -1) {
          boundaryStart = boundaryPosition + outerLimitLength;
        } else {
          boundaryStart = 0;
        }
        
        // find right boundary, first limit the text to the
        // next new line
        boundaryPosition = text.indexOf(outerLimit, selectionEnd); 
        if(boundaryPosition === -1) {
          subString = text.slice(boundaryStart);
        } else {
          subString = text.slice(boundaryStart, boundaryPosition);
        }

        // Then find the next boundary
        boundaryPosition = 0;
        do{
          boundaryPosition = subString.indexOf(boundary, boundaryPosition + outerLimitLength);
        } while(boundaryPosition !== -1 && selectionEnd > boundaryStart + boundaryPosition);

        // when it doesn't exist, extend the selection to the
        // paragraph end
        if(boundaryPosition === -1) {
          boundaryPosition = subString.length;
        }
        boundaryEnd = boundaryStart + boundaryPosition;
      }
      
      editor.boundaryStart = boundary ? boundaryStart : selectionStart;
      editor.boundaryEnd = boundary ? boundaryEnd : selectionEnd;
      editor.boundaryDistance = boundary ? boundaryPosition : (selectionStart - selectionEnd);

      return text.slice(editor.boundaryStart, editor.boundaryEnd);
    },
    /**
     * Extend the selection to the given boundary and return it.
     *
     * @param {Editor} editor The editor to work on
     * @param {String} [boundary] The right and left boundary the
     * selection should be extended to
     *
     * @returns {String} The currently selected string
     */
    extendSelection: function(editor, boundary){
      var selection = this.getSelection(editor, boundary);
      editor.setSelectionRange(editor.boundaryStart, editor.boundaryEnd);
      return selection;
    },
    /**
     * Replace the current selection with the given string
     *
     * @param {Editor} editor The editor to work on
     * @param {String} string The replacement string
     * @param {Boolean} collapseToStart If the selection should collapse
     */
    replaceSelection: function(editor, string, collapseToStart) {
      var textArea = editor.textArea,
      newSelectionStart = editor.selectionStart,
      newSelectionEnd = editor.selectionStart + string.length;

      // gecko & webkit
      textArea.val(textArea.val().slice(0, editor.selectionStart) + string + textArea.val().slice(editor.selectionEnd, textArea.val().length));

      // move caret gecko
      if(collapseToStart === true){
        newSelectionEnd = newSelectionStart;
      } else if(collapseToStart === false){
        newSelectionStart = newSelectionEnd;
      }

      editor.setSelectionRange(newSelectionStart, newSelectionEnd);
      textArea.focus();
    },
    /**
     * Extend the right selection with a regexp. Everything matched will be added
     * to the selection. Useful for special cases like toggling parts of a bolded
     * String in textile
     *
     * @param {Editor} editor The editor to work on
     * @param {RegExp} regexp The regexp
     * 
     * @example
     * extendRightSelection(/ +/)
     */
    extendRightSelection: function(editor, regexp){
      var match;
      regexp = new RegExp(regexp.source,'g');
      regexp.lastIndex = editor.selectionEnd;
      match = regexp.exec(editor.textArea.val());

      if(match && regexp.lastIndex == editor.selectionEnd + match[0].length){
        editor.selectionEnd += match[0].length;
        return match[0];
      }
    },
    /**
     * Extend the left selection with a regexp. Everything matched will be added
     * to the selection. Useful for special cases like toggling parts of a bolded
     * String in textile
     *
     * @param {Editor} editor The editor to work on
     * @param {RegExp} regexp The regexp.
     * 
     * @example
     * extendLeftSelection(/[ .]+/)
     */
    extendLeftSelection: function(editor, regexp){
      var match, substring = editor.textArea.val().slice(0,editor.selectionStart);
      regexp = new RegExp(regexp.source + "$");
      match = regexp.exec(substring);
      
      if(match){
        editor.selectionStart -= match[0].length;
        return match[0];
      }
    }};
  
  

  /**
   * Create a button for the toolbar
   *
   * @constructor
   * @name ToolbarButton
   *
   * @property {String} name The class name of the button
   * @property {Function} clicked The action if the button is clicked upon
   * @property {Function} isAvailable Returns true if the the function
   * is available in the current editer
   *
   * @param {String} name The class name of the button
   * @param {Function} [clicked] The action if the button is clicked
   * @param {Function} [isAvailable] Returns true if the the function
   * is available in the current editer
   */
  function ToolbarButton(name, clicked, isAvailable){
    this.name = name;
    this.isAvailable = isAvailable;
    if(clicked){
      this.clicked = clicked;
      globalItems.push(name);
    }
  }
  ToolbarButton.prototype = /** @scope ToolbarButton.prototype */{
    /**
     * @returns {String} A html string of the button
     */
    getButton: function() {
      return '<a href="#" class=\"'+ this.name +'" ><span>'+ this.name +'</span></a>';
    }
  };

  /**
   * Create a select for the toolbar
   *
   * @constructor
   * @name ToolbarSelect
   * @augments ToolbarButton
   *
   * @property {Array} options The options of the select dropdown
   *
   * @param {String} name The class name of the button
   * @param {Array} [options] The options of the select dropdown
   * @param {Function} [clicked] The default action if the button is clicked
   */
  function ToolbarSelect(name, options, clicked, isAvailable){
    ToolbarButton.apply(this, [name, clicked, isAvailable]);
    this.options = options || [];
  }
  ToolbarSelect.prototype = /** @scope ToolbarSelect.prototype */{
    /**
     * @returns {String} A html string of the button
     */
    getButton: function() {
      var select = "<select class=\"" + this.name +  "\">",
      optionsLength = this.options.length,
      i;

      select.className = this.name;

      for (i = 0; i < optionsLength; i += 1){
        select += "<option value=\"" + this.options[i][0] + "\">" + this.options[i][1] + "</option>";
      }
      return select + "</select>";
    }
  };  // end ToolbarSelect

  /**
   * Create the HTML representation of the editors toolbar
   *
   * @returns {String} The toolbar
   */
  function getToolbarHTML(){
    var i,l, item;

    if(!toolbarHTML){
      for(i=0,l=availableItems.length; i < l ; i++){
        item = toolbarItems[availableItems[i]];
        if(item){
          toolbarHTML += item.getButton();
        }
      }
    }

    return toolbarHTML;
  }
  
  function changeIfNecessary(select, newVal){
    if(select.val() !== newVal){
      select.val(newVal).change();
    }
  }

  function useExternalChangeDataModeSelect(select, toolbarDiv, editorID) {
    var toolbarSelect = toolbarDiv.find('.changeDataMode');
    toolbarSelect.html(select.find('option').clone())
      .change(function(){
        changeIfNecessary(select, $(this).val());
      });

    var editorIDs = select.data('editorIDs') || [];
    if(!editorIDs[0]){
      select.hide().change(function(){
        changeIfNecessary(toolbarSelect, $(this).val());
      });
    }
    editorIDs.push(editorID);
    select.data('editorIDs', editorIDs);
  }

  /**
   * Create a toolbar for an editor. Every editor has its own toolbar, since the
   * items of the toolbar can be defined on a per editor basis (save
   * callback)
   * TODO decouple toolbar and editor
   *
   * @constructor
   * @name Toolbar
   */
  function Toolbar(editor) {

    // init Toolbar Items
    var button, buttonTags = '',
    toolbarDiv = $("<div class=\"toolbar\"></div>"),
    that = this,
    select = editor.settings.select;

    this.div = toolbarDiv;

    toolbarDiv.html(getToolbarHTML());

    if(select){
      useExternalChangeDataModeSelect(select, toolbarDiv, editor.id);
    }

    toolbarDiv.mouseup(function(e) { // Trigger on button click
      target = e.target;

      if((/(a|span)/i).test(target.nodeName)) {
        // When the span is clicked change the Target to the
        // containing div
        if(/span/i.test(target.nodeName)) {
          target = target.parentNode;
        }
        if(target.disabled){
          // TODO handle focus somewhere
          if(editor.is('wysiwyg')){
            editor.preview.focus();
          } else {
            editor.textArea.focus();
          }
          return false;
        }
        var action = target.className;

        action = action.split(" ")[0];
        
        that.runAction(editor, action, target);
      }
    }).change(function(e) { // trigger on select change
      var target = e.target;
      that.runAction(editor, target.className, target);
      return false;
    }).click(function(e){return false; }); //
  } // end initToolbar

  Toolbar.prototype = /** @scope Toolbar.prototype */{
    /**
     * Load the toolbar for the current mode. If a toolbar item is not
     * supported, it will be hidden.
     */
    loadModeToolbar: function(editor){
      var supportedItems = editor.currentMode.supportedItems,
      oldVisibleItems = this.visibleItems,
      newVisibleItems = [];
      
      // Optimize: better scheme. Calculate the differences between
      // the modes once and use them here
      this.div.children().each(function(){
        var item = this.className.split(' ')[0], isAvailable = toolbarItems[item].isAvailable;
        if(supportedItems.indexOf(item) != -1 && (!isAvailable || isAvailable(editor))){
          if(!oldVisibleItems || oldVisibleItems.indexOf(item) == -1){
            $(this).show();
          }
          newVisibleItems.push(item);
        } else {
          if(!oldVisibleItems || oldVisibleItems.indexOf(item) != -1){
            $(this).hide();
          }
        }
      });
      this.visibleItems = newVisibleItems;
    },
    /**
     * Execute the given action of the current mode
     * 
     * @param {String} action The action to execute
     * @param {HTMLElement} target The target of the click
     */
    runAction: function(editor,action,target) {
      var asynchronous,
      item = toolbarItems[action],
      mode = editor.currentMode;

      if(editor.is('wysiwyg')){
        editor.preview.focus();
      }

      // execute buttons clicked action
      asynchronous = (item[mode.id] || item).clicked(editor, target);
      
      if(!asynchronous){
        editor.checkState();
        // Update Preview in case something has changed
        if( !editor.is("wysiwyg")) {
          mode.updatePreview(editor);
        }
      }
    },
    /**
     * Activate the buttons/selects of the given actions on the toolbar
     * 
     * @param {Object} actions The actions which should be active
     */
    setActive: function( actions ) {
      console.log('setActive', actions);
      // activate each action in actions
      if(actions) {
        this.div.children().each(function(i) {
          var action = this.className.split(" ")[0];
          if (actions[action] == 'disable') { // deactivate
            this.disabled = true;
            this.className = action + " disabled";
          } else {
            this.disabled = false;
            this.className = action;
            if(actions[action] === true) { // buttons
              this.className = action + " on";
            } else if(actions[action]){ // selects
              this.value = actions[action];
            }
          }
        });
      }
    }
  }; // end Toolbar prototype
  
  /**
   * Create a new Editor
   * 
   * An editor has a current mode and a textarea mode. Both are the same if you 
   * edit the textarea directly (e.g. textile). In the wysiwyg mode you edit the
   * html directly.
   *
   * @constructor
   * @name Editor
   * 
   * @param {jQuery} textArea The textarea
   * @param {Object} settings Editor specific settings
   */
  function Editor(textArea, settings) {
    var editor = this, timer = 0, preview = settings.preview;

    activeEditors[numberOfEditors] = editor;
    editor.id = numberOfEditors;
    // console.log("init editor " + numberOfEditors);
    numberOfEditors ++;

    this.setDataType(textArea.attr("class"));
    this.settings = settings;

    if(!this.dataType) { return ;}

    function addKeyListeners(object, isTextarea){
      object.keydown(function(e){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.pressed(editor, e.keyCode);
        }
      }).keyup(function(e){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.released(editor, e.keyCode);
        }
      }).mouseup(function(){
        if(isTextarea || editor.is('wysiwyg')){
          editor.focus();
          return editor.currentMode.clicked(editor);
        }
      });
    }

    // mouseup will catch all three mouse buttons. Since all keys move
    // the cursor a check is necessary
    this.textArea = textArea.bind("mouseup keyup", function() {
      editor.checkState();
      clearTimeout(timer);
      timer = setTimeout(function(){
        editor.currentMode.updatePreview(editor);
      },1000);
    });
    addKeyListeners(textArea,true);

    if(preview){
      preview.addClass('preview');
    } else {
      preview = $("<div class=\"preview\">");
    }
    this.preview = preview.bind("mouseup keyup", function() {
        if(editor.is("wysiwyg")) {
          editor.checkState();
        }
      });
    addKeyListeners(this.preview);

    this.overlay = $('<div class=\"overlay\"><div class=\"background\"></div><div class=\"spinner\"></div></div>');
    
    this.toolbar = new Toolbar(this);
    this.container = textArea.wrap("<div class=\"markupEditor\">")
      .parent()
      .append(editor.preview)
      .append(this.overlay)
      .prepend(this.toolbar.div);
    textArea.wrap("<div class=\"textarea\">");
  } // Editor

  Editor.extractDataType = function(classString){
    var i, cssClass,
    cssClasses = classString.split(/\s+/);

    for(i = 0; i < cssClasses.length; i += 1) {
      cssClass = cssClasses[i];

      if(cssClass !== "wysiwyg" && availableModes[cssClass]) {
        return cssClass;
      }
    }
  };

  Editor.prototype = /** @scope Editor.prototype */{
    /**
     * Change the current mode to the given id
     * 
     * @param {String} modeId The id of the mode (e.g. textile)
     */
    changeMode: function(modeId, silent) {
      var editor = this,
      nextMode = ME.getMode(modeId),
      oldMode = editor.currentMode;

      // TODO warn about mode change here
      this.warnIfNecessary(oldMode,nextMode, function(){
        editor.beginModeChange();
        console.log('+++++ changeMode start ' + modeId);
        
        editor.synchronize(function(){
          editor.oldMode = oldMode;
          editor.currentMode = nextMode;
          nextMode.activate(editor, function(){
            console.log('+++++ changeMode finished ' + modeId);
            nextMode.afterActivation(editor);
            editor.checkState();

            delete editor.oldMode;
            editor.finalizeModeChange(silent);
          });
        });
      }, silent);
    },
    /**
     * Change the current underlying data format
     * 
     * @param {String} modeId The id of the mode (e.g. textile)
     */
    changeDataMode: function(modeId, silent){
      var isInWysiwyg = this.is('wysiwyg'),
      dataMode = ME.getMode(modeId);
      if(!modeId || modeId === this.currentMode.id) {
        return false;
      }

      if(isInWysiwyg && dataMode.toText){
        this.dataType = modeId;
        this.checkState();
        this.syncEditors(silent);
      } else {
        this.changeMode(modeId);
      }
    },
    warnIfNecessary: function(oldMode, nextMode, callback, silent){
      var editor = this;
      if(silent || (nextMode.toText && oldMode.toHTML)){
        callback();
      } else {
        // TODO use i18n shortcut here
        if(nextMode.toText){
          text = 'The old mode could not convert to HTML. You will have to convert the markup manually.';
        } else {
          text = 'This mode can not convert HTML to your markup. You will have to convert the markup manually';
        }
        dialogProxy = ME.dialog.notice(['Ok', 'Cancel'], text);
        dialogProxy.dialog('open', {
          submit: function(){
            if(callback){
              callback();
            }
          },
          cancel: function(){
            editor.toolbar.div.find('.changeDataMode')
              .val(oldMode.id);
          }
        });
      }
    },
    /**
     * Lock the Editor, idempotent
     */
    beginModeChange: function(){
      this.overlay.show();
    },
    syncEditors: function(silent) {
      var i, editorID, otherEditor, editorIDs,
      externalSelect = this.settings.select,
      newModeID = this.currentMode.id;

      if(externalSelect && !silent){
        editorIDs = externalSelect.data('editorIDs') || [];

        for(i = editorIDs.length; --i >= 0;){
          editorID = editorIDs[i];
          if(editorID === this.id){
            continue;
          }

          otherEditor = activeEditors[editorID];

          if(newModeID !== otherEditor.currentMode.id){
            otherEditor.changeMode(newModeID, true);
          } else { // wysiwyg datamode change
            otherEditor.changeDataMode(this.dataType, true);
          }
        }
      }
    },
    /**
     *
     */
    finalizeModeChange: function(silent){
      this.overlay.hide();
      this.syncEditors(silent);
    },
    /**
     * @returns {Mode} The current datamode
     */
    getDataMode: function() {
      return ME.getMode(this.dataType);
    },
    /**
     * Extract the datatype from the given class string 
     *
     * @param {String} classString The class string of the editor element
     */
    setDataType: function(classString) {
      this.dataType = Editor.extractDataType(classString);
    },
    /**
     * @param {String} text The text inside the textarea to save one
     *    dom call
     */
    initSelectionProperties: function(text){
      var textArea = this.textArea,
      selectionEnd;
      
      this.scrollPosition = textArea.scrollTop;
      this.selectionStart = textArea[0].selectionStart;
      selectionEnd = textArea[0].selectionEnd;
      
      // Shrink selection if cursor is before a line since the
      // replacement will not contain a trailing new line
      if(selectionEnd != this.selectionStart && text[selectionEnd-1] === "\n"){
        selectionEnd -= 1;
      }
      this.selectionEnd = selectionEnd;
    },
    setSelectionRange: function(selectionStart, selectionEnd){
      this.textArea[0].setSelectionRange(selectionStart, selectionEnd);
      this.selectionStart = selectionStart;
      this.selectionEnd = selectionEnd;
    },
    /**
     * Synchronize the changes between preview div and the text area
     */
    synchronize: function(callback) {
      if(this.is("wysiwyg")) {
        this.currentMode.updateTextArea(this, callback);
      } else {
        this.currentMode.updatePreview(this, callback);
      }
    },
    /**
     * Check which mode is loaded.
     *
     * @param {String} modeId The short name of the mode e.g. wysiwyg
     * 
     * @returns {Boolean} Returns true if the current mode has the
     *given modeId
     */
    is: function(modeId) {
      return this.currentMode.id === modeId;
    },
    /**
     * Check the state of the current selection (bold/italic etc.) and
     * change the toolbar.
     */
    checkState: function () {
      this.toolbar.setActive(this.currentMode.getStates(this));
    },
    /**
     * Focus the editor, which will show the toolbar etc.
     */
    focus: function() {
      if(focusedEditor){
        activeEditors[focusedEditor].blur();
      }
      focusedEditor = this.id;
      // console.log("new focus: " + this.id);
    },
    /**
     * Blur (unfocus) the Editor, hide the toolbar etc.
     */
    blur: function(){
      
    },
    /**
     * Close the editor and restore the original div/textarea
     */
    close: function() {
      var replacement = this.settings.preview || this.textArea;
      this.synchronize();
      
      this.container.replaceWith(replacement);
      replacement.removeClass('preview').unbind()
        .attr('contentEditable',false).show()
        .markupEditor('prepare', this.settings);
    }
  }; // end Editor prototype

  /**
   * @namespace Holds all public methods
   */
  ME = {
    /**
     * Add a mode
     *
     * @param {String} modeId The id of the mode as referenced
     * internally
     * @param {Object} modeDefinition Defines methods and toolbaritems
     * of the new Mode
     * @param {Boolean} [isGenerated] True if the mode has been added
     * on the fly
     */
    addMode: function(modeId, modeDefinition, isGenerated) {
      var constructor,
      items = modeDefinition.items,
      supportedItems = globalItems.slice(); // global items (like
      // save) are supported
      
      modeDefinition.id = modeId;
      
      if(items) {
        for( item in items) {
          if(items.hasOwnProperty(item) && item !== "default") {
            supportedItems.push(item);
            if(!toolbarItems[item]) {
              constructor = items[item].options ? ToolbarSelect : ToolbarButton;
              toolbarItems[item] = new constructor(item);
            }
            toolbarItems[item][modeId] = $.extend({name: item}, items["default"], items[item]);
          }
        }
      }

      if(modeId !== 'wysiwyg'){
        toolbarItems.changeDataMode.options.push([modeId, modeDefinition.name]);
      }

      modeDefinition.supportedItems = supportedItems;

      return availableModes[modeId] = new Mode(modeDefinition);
    },
    /**
     * Get the specified mode. Loads it if necessary
     *
     * @param {String} modeId The id of the mode (e.g. textile)
     *
     * @returns {Mode} The initialized mode
     */
    getMode: function(modeId) {
      var mode = availableModes[modeId];
      if (mode) {
        return mode;
      }
      else {
        console.log("Mode " + modeId + " is not defined, adding it");
        return this.addMode(modeId, {
          name: modeId
        }, true)
      }
    },
    /**
     * The global options of markup editor
     *
     * @class
     * @property {Function} save The save callback. Takes the editor
     * as parameter
     * @property {Boolean} closable If true, the close button is
     * visible
     * @property {jQuery} preview The preview the editor has been
     * loaded from
     */
    options: {},
    /**
     * Set the options
     *
     * @see ME#options for settable options
     *
     * @param {Object} options The options object
     */
    setOptions: function(options){
      this.options = options;
    }
  };

  toolbarItems.changeDataMode = new ToolbarSelect("changeDataMode", [], function(editor, target) {
    editor.changeDataMode(target.value);
    return true;
  }, function(editor){
    return editor.toolbar.div.find('.changeDataMode option').length > 1;
  });

  toolbarItems.formatBlock = new ToolbarSelect("formatBlock",[
    ["p", "Paragraph"],
    ["h1", "Heading 1"],
    ["h2", "Heading 2"],
    ["h3", "Heading 3"]
  ]);

  toolbarItems.save = new ToolbarButton("save", function(editor){
    editor.synchronize();
    editor.settings.save(editor);
    return true;
  }, function(editor){
    return editor.settings.save;
  });

  toolbarItems.wysiwyg = new ToolbarButton("wysiwyg", function(editor){
    if(editor.is('wysiwyg')){
      editor.changeMode(editor.dataType);
    } else {
      editor.changeMode('wysiwyg');
    }
    return true;
  }, function(editor){
    var mode = editor.currentMode;
    return mode.toHTML && mode.toText;
  });

  toolbarItems.close = new ToolbarButton('close', function(editor){
    editor.close();
  }, function(editor) {
    var settings = editor.settings;
    return settings.preview || settings.closable;
  });

  /**
   * @name jQuery
   * @namespace The popular DOM utility
   */

  var methods = {
    /**
     * Create the markup editor
     *
     * @param {Object} settings The specific settings for the editor
     * @see ME#settings
     */
    init: function(settings) {
      ME.settings = settings;
      return this.each(function(index,element) {
        var $element = $(element), editor;
        if($element.is("textarea")) {
          initEditorFromTextarea($element, settings);
        } else {
          initEditorFromHTML($element, settings);
        }
      });
    },
    close: function(){
      // find ta and get number of editor
      // execute editor.close
    },
    prepare: function(settings) {
      return this.one('click', function(){
        $(this).markupEditor(settings);
      });
    }
  };
  
  /**
   * Markupeditor method.
   *
   * @memberOf jQuery.prototype
   *
   * @param {String} [method="init"] The method to call
   */
  $.fn.markupEditor= function(method) {
    var args = Array.prototype.slice.call(arguments, 1);
    if(typeof method === 'object'){
      args.push(method);
    }
    if (!methods[method]) {
      method = 'init';
    }
    return methods[method].apply(this, args);
  };

  function isValidDatatype(cssClass, changeDatamodeSelect){
    if(!Editor.extractDataType(cssClass, changeDatamodeSelect)){
      ME.dialog.notice(['Ok'],'Datamode not found. Please specify a valid datamode')
        .dialog('open');
    } else {
      return true;
    }
  }
  
  /**
   * Initialize the editor from a given HTML element
   *
   * @memberOf ME
   * @inner
   * @param {jQuery} container The element which will be editable
   * @param {Option} settings Settings for this editor
   */
  function initEditorFromHTML(container, settings){
    if(!isValidDatatype(container[0].className)){
      return;
    }
    var editor,src,
    textarea = $("<textarea class=\"" + container[0].className + "\">");

    container.css("min-height", container.height());
    container.before(textarea); // needs to be attached to DOM in firefox

    settings = settings || {};
    settings.preview = container;
    editor = initEditorFromTextarea(textarea, settings);

    src = container.attr('src');
    if(src){
      $.get(src, {
      }, function(text, status, response){
        textarea.val(text);
        editor.checkState();
        editor.currentMode.updatePreview(editor);
      })
    } else {
      editor.currentMode.updateTextArea(editor);
      editor.changeMode("wysiwyg");
    }
  }
  
  /**
   * Initialize the editor from a given textarea
   *
   * @memberOf ME
   * @inner
   * @param {jQuery} textarea The textarea which will be enhanced
   * @param {Option} instanceSettings Settings for this editor
   */
  function initEditorFromTextarea(textarea,instanceSettings){
    if(!isValidDatatype(textarea[0].className)){
      return;
    }
    var editor,settings = {};
    $.extend(settings,globalSettings,instanceSettings);
    editor = new Editor(textarea, settings);

    editor.currentMode = editor.getDataMode();

    if(textarea.hasClass("wysiwyg")) {
      editor.changeMode('wysiwyg');
    } else {
      editor.currentMode.activate(editor, function(){
        editor.currentMode.afterActivation;
      });
    }

    return editor;
  }
  
}