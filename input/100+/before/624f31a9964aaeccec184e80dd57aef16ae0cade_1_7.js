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
     */
    pressed: function(keyCode){
      if(keyCode === 16){
        ME.holdShift = true;
      }
      if(ME.util.isNeutralKey(keyCode)){
        ME.holdNeutralKey = true;
      }
    },
    /**
     * Handle special keys (shift press) to deal with key combos
     */
    released: function(keyCode){
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
     */
    activate: function(editor) {
      if(editor.htmlDiv.is(":empty")) {
        this.updatePreview(editor);
      } else {
        this.updateTextArea(editor);
      }
      editor.toolbar.loadModeToolbar(editor);
      this.afterActivation(editor);
    },
    /**
     * Update the preview html div with the html representation of the
     *mode
     * CONSIDER move to editor
     */
    updatePreview: function(editor) {
      console.log("updating preview in Mode " + this.name);
      editor.htmlDiv.html(this.toHTML(editor) || "<p>&nbsp;</p>");
    },
    /**
     * Update the textarea with the text representation of the mode
     */
    updateTextArea: function(editor) {
      console.log("updating TA in Mode " + this.name);
      editor.textArea.val(this.toText(editor));
    },
    /**
     * Run after activation. Default behaviour for text modes. wysiwyg mode has 
     * its own version
     */
    afterActivation: function(editor) {
      editor.textArea
        .parent().show()
        .find(":first-child").focus()[0]
        .setSelectionRange(0,0);
      editor.htmlDiv.attr("contentEditable",false);
    },
    /**
     * Get a state object which sets defines the states of the buttons
     * and the selects.
     * @returns {Object} an object that describes the states
     */
    getStates: function(editor){
      var states = this.getSelectionStates(editor);
      if(this.id === 'wysiwyg'){
        states.wysiwyg = true;
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
     * @param {String} [boundary] The right and left boundary the
     * selection should be extended to
     * @returns {String} The currently selected string
     */
    getSelection: function(editor, boundary) {
      var textArea = editor.textArea, text = textArea.val(), boundaryPosition, subString;
      textArea.focus();

      // gecko & webkit
      editor.initSelectionProperties();

      // TODO does this introduce some edgecases? Eating newlines
      // move this to initSelectionProperties?
      if(text[editor.selectionEnd-1] === "\n"){
        editor.selectionEnd -= 1;
      }

      if(boundary) {
        // find left boundary
        boundaryPosition = Math.max(text.lastIndexOf(boundary, editor.selectionStart), text.lastIndexOf("\n", editor.selectionStart));
        if(boundaryPosition !== -1) {
          editor.boundaryStart = boundaryPosition + 1;
        } else {
          editor.boundaryStart = 0;
        }
        
        // find right boundary, first limit the text to the
        // next new line
        boundaryPosition = text.indexOf("\n", editor.selectionEnd); 
        if(boundaryPosition === -1) {
          subString = text.slice(editor.boundaryStart);
        } else {
          subString = text.slice(editor.boundaryStart, boundaryPosition);
        }

        // Then find the next boundary
        boundaryPosition = 0;
        do{
          boundaryPosition = subString.indexOf(boundary, boundaryPosition + 1);
        } while(boundaryPosition !== -1 && editor.selectionEnd > editor.boundaryStart + boundaryPosition);

        // when it doesn't exist, extend the selection to the
        // paragraph end
        if(boundaryPosition === -1) {
          boundaryPosition = subString.length;
        }
        editor.boundaryEnd = editor.boundaryStart + boundaryPosition;
      }
      editor.boundaryDistance = boundaryPosition;
      return text.slice(editor.boundaryStart, editor.boundaryEnd);
    },
    extendSelection: function(editor, boundary){
      var selection = this.getSelection(editor, boundary);
      editor.setSelectionRange(editor.boundaryStart, editor.boundaryEnd);
      return selection;
    },
    /**
     * Replace the current selection with the given string
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
  function ToolbarSelect(name, options, clicked){
    ToolbarButton.apply(this, [name, clicked]);
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
  
  /**
   * Create a toolbar for an editor. Every editor has its own toolbar, since the
   * items of the toolbar can be defined on a per editor basis (save callback)
   *
   * @constructor
   * @name Toolbar
   */
  function Toolbar(editor) {

    // init Toolbar Items
    var button, buttonTags = '',
    toolbarDiv = $("<div class=\"toolbar\"></div>"),
    that = this;

    this.div = toolbarDiv;

    toolbarDiv.html(getToolbarHTML());

    toolbarDiv.mouseup(function(e) { // Trigger on button click
      var target = e.target;

      if((/(a|span)/i).test(target.nodeName)) {
        // When the span is clicked change the Target to the
        // containing div
        if(/span/i.test(target.nodeName)) {
          target = target.parentNode;
        }
        if(target.disabled){
          // TODO handle focus somewhere
          if(editor.is('wysiwyg')){
            editor.htmlDiv.focus();
          } else {
            editor.textArea.focus();
          }
          return false;
        }
        var action = target.className;

        action = action.split(" ")[0];
        that.runAction(editor, action, target);
        // TODO this does not work with dialogs
        // in dialogs this gets set manually, but perhaps there is a
        // more general way?
        editor.checkState();
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
      var item = toolbarItems[action],
      mode = editor.currentMode;

      // execute buttons clicked action
      (item[mode.id] || item).clicked(editor, target);
      
      // Update Preview in case something has changed
      if(action != "changeMode" && !editor.is("wysiwyg")) {
        mode.updatePreview(editor);
      }
    },
    /**
     * Activate the buttons/selects of the given actions on the toolbar
     * 
     * @param {Object} actions The actions which should be active
     */
    setActive: function( actions ) {
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
    var editor = this, timer = 0, htmlDiv = settings.htmlDiv;

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

    if(htmlDiv){
      htmlDiv.addClass('preview');
    } else {
      htmlDiv = $("<div class=\"preview\"></div>");
    }
    this.htmlDiv = htmlDiv.bind("mouseup keyup", function() {
        if(editor.is("wysiwyg")) {
          editor.checkState();
        }
      });
    addKeyListeners(this.htmlDiv);
    
    this.toolbar = new Toolbar(this);
    this.container = textArea.wrap("<div class=\"markupEditor\"></div>")
      .parent().append(editor.htmlDiv).
      prepend(this.toolbar.div);
    textArea.wrap("<div class=\"textarea\">");

    activeEditors[numberOfEditors] = editor;
    editor.id = numberOfEditors;
    // console.log("init editor " + numberOfEditors);
    numberOfEditors ++;
  } // Editor

  Editor.prototype = /** @scope Editor.prototype */{
    /**
     * Change the current mode to the given id
     * 
     * @param {String} modeId The id of the mode (e.g. textile)
     */
    changeMode: function(modeId) {
      var nextMode;
      nextMode = ME.getMode(modeId);
      this.synchronize();
      this.currentMode = nextMode;
      nextMode.activate(this);
    },
    /**
     * Change the current underlying data format
     * 
     * @param {String} modeId The id of the mode (e.g. textile)
     */
    changeDataMode: function(modeId){
      var isInWysiwyg = this.is('wysiwyg');
      if(!modeId || modeId === this.currentMode.id) {
        return false;
      }
      this.changeMode(modeId);
      if(isInWysiwyg){
        this.changeMode('wysywyg');
      }
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
      var i, cssClass,
      cssClasses = classString.split(/\s+/);

      for(i = 0; i < cssClasses.length; i += 1) {
        cssClass = cssClasses[i];

        if(cssClass !== "wysiwyg" && availableModes[cssClass]) {
          this.dataType = cssClass;
        }
      }
    },
    initSelectionProperties: function(){
      var textArea = this.textArea;
      
      this.scrollPosition = textArea.scrollTop;
      this.selectionStart = textArea[0].selectionStart;
      this.selectionEnd = textArea[0].selectionEnd;
    },
    setSelectionRange: function(selectionStart, selectionEnd){
      this.textArea[0].setSelectionRange(selectionStart, selectionEnd);
      this.selectionStart = selectionStart;
      this.selectionEnd = selectionEnd;
    },
    /**
     * Synchronize the changes between preview div and the text area
     */
    synchronize: function() {
      if(this.is("wysiwyg")) {
        ME.getMode(this.dataType).updateTextArea(this);
      } else {
        this.currentMode.updatePreview(this);
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
      var replacement = this.settings.htmlDiv || this.textArea;
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
     */
    addMode: function(modeId, modeDefinition) {
      var items = modeDefinition.items, constructor, supportedItems = globalItems.slice();
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
        console.log("Mode " + modeId + " is not defined");
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
     * @property {jQuery} htmlDiv The htmlDiv the editor has been
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

  toolbarItems.changeDataMode = new ToolbarSelect("changeDataMode", [], function(editor, mode, target) {
    editor.changeDataMode(target.value);
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
  }, function(editor){
    return editor.settings.save;
  });

  toolbarItems.wysiwyg = new ToolbarButton("wysiwyg", function(editor, mode){
    if(editor.is('wysiwyg')){
      editor.changeMode(editor.dataType);
    } else {
      editor.changeMode('wysiwyg');
    }
  });

  toolbarItems.close = new ToolbarButton('close', function(editor){
    editor.close();
  }, function(editor) {
    var settings = editor.settings;
    return settings.htmlDiv || settings.closable;
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
  
  /**
   * Initialize the editor from a given HTML element
   *
   * @memberOf ME
   * @inner
   * @param {jQuery} container The element which will be editable
   * @param {Option} settings Settings for this editor
   */
  function initEditorFromHTML(container, settings){
    container.css("min-height", container.height());
    var editor,
    textarea = $("<textarea class=\"" + container[0].className + "\">");
    container.before(textarea); // needs to be attached to DOM in firefox

    settings = settings || {};
    settings.htmlDiv = container;
    editor = initEditorFromTextarea(textarea, settings);
    editor.currentMode.updateTextArea(editor);
    editor.changeMode("wysiwyg");
    editor.checkState();
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
    var editor,settings = {};
    $.extend(settings,globalSettings,instanceSettings);
    editor = new Editor(textarea, settings);

    editor.currentMode = editor.getDataMode();

    if(textarea.hasClass("wysiwyg")) {
      // TODO better flow here
      editor.currentMode.activate(editor);
      editor.currentMode = ME.getMode("wysiwyg");
    }
    editor.currentMode.activate(editor);
    editor.checkState();
    return editor;
  }
  
}