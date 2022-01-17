function (callback) {
    // TODO: Gotta get the privates with underscores!
    // TODO: Gotta document what these are for...
    var self = this
      , _HtmlTemplates
      , iframeElement
      , baseTag
      , widthDiff
      , heightDiff
      , utilBtns
      , utilBar
      , utilBarTimer
      , keypressTimer
      , mousePos = { y: -1, x: -1 }
      , _elementStates
      , _isInEdit
      , nativeFs = document.body.webkitRequestFullScreen ? true : false
      , _goFullscreen
      , _exitFullscreen
      , elementsToResize
      , fsElement
      , isMod = false
      , isCtrl = false
      , eventableIframes
      , i; // i is reused for loops

    callback = callback || function () {};

    // This needs to replace the use of classes to check the state of EE
    self.eeState = {
      fullscreen: false
    , preview: false
    , edit: true
    , loaded: false
    , unloaded: false
    }

    // The editor HTML
    // TODO: edit-mode class should be dynamically added
    _HtmlTemplates = {
      // This is wrapping iframe element. It contains the other two iframes and the utilbar
      chrome:   '<div id="epiceditor-wrapper" class="epiceditor-edit-mode">' +
                  '<iframe frameborder="0" id="epiceditor-editor-frame"></iframe>' +
                  '<iframe frameborder="0" id="epiceditor-previewer-frame"></iframe>' +
                  '<div id="epiceditor-utilbar">' +
                    '<img width="30" src="' + this.settings.basePath + '/images/preview.png" title="Toggle Preview Mode" class="epiceditor-toggle-btn epiceditor-toggle-preview-btn"> ' +
                    '<img width="30" src="' + this.settings.basePath + '/images/edit.png" title="Toggle Edit Mode" class="epiceditor-toggle-btn epiceditor-toggle-edit-btn"> ' +
                    '<img width="30" src="' + this.settings.basePath + '/images/fullscreen.png" title="Enter Fullscreen" class="epiceditor-fullscreen-btn">' +
                  '</div>' +
                '</div>'
    
    // The previewer is just an empty box for the generated HTML to go into
    , previewer: '<div id="epiceditor-preview"></div>'
    };

    // Used to setup the initial size of the iframes
    function setupIframeStyles(el) {
      for (var x = 0; x < el.length; x++) {
        el[x].style.width  = self.element.offsetWidth - widthDiff + 'px';
        el[x].style.height = self.element.offsetHeight - heightDiff + 'px';
      }
    }

    // Used for resetting the width of EE mainly for fluid width containers
    function resetWidth(el) {
      widthDiff = _outerWidth(self.element) - self.element.offsetWidth;
      for (var x = 0; x < el.length; x++) {
        el[x].style.width  = self.element.offsetWidth - widthDiff + 'px';
      }
    }
    // Write an iframe and then select it for the editor
    self.element.innerHTML = '<iframe scrolling="no" frameborder="0" id= "' + self.instanceId + '"></iframe>';
    iframeElement = document.getElementById(self.instanceId);
    
    // Store a reference to the iframeElement itself
    self.iframeElement = iframeElement;

    // Grab the innards of the iframe (returns the document.body)
    // TODO: Change self.iframe to self.iframeDocument
    self.iframe = _getIframeInnards(iframeElement);
    self.iframe.open();
    self.iframe.write(_HtmlTemplates.chrome);

    // Now that we got the innards of the iframe, we can grab the other iframes
    self.editorIframe = self.iframe.getElementById('epiceditor-editor-frame')
    self.previewerIframe = self.iframe.getElementById('epiceditor-previewer-frame');

    // Setup the editor iframe
    self.editorIframeDocument = _getIframeInnards(self.editorIframe);
    self.editorIframeDocument.open();
    // Need something for... you guessed it, Firefox
    self.editorIframeDocument.write('');
    self.editorIframeDocument.close();
    
    // Setup the previewer iframe
    self.previewerIframeDocument = _getIframeInnards(self.previewerIframe);
    self.previewerIframeDocument.open();
    self.previewerIframeDocument.write(_HtmlTemplates.previewer);

    // Base tag is added so that links will open a new tab and not inside of the iframes
    baseTag = self.previewerIframeDocument.createElement('base');
    baseTag.target = '_blank';
    self.previewerIframeDocument.getElementsByTagName('head')[0].appendChild(baseTag);

    self.previewerIframeDocument.close();

    // Set the default styles for the iframe
    widthDiff = _outerWidth(self.element) - self.element.offsetWidth;
    heightDiff = _outerHeight(self.element) - self.element.offsetHeight;
    elementsToResize = [self.iframeElement, self.editorIframe, self.previewerIframe];
     
    setupIframeStyles(elementsToResize);

    // Insert Base Stylesheet
    _insertCSSLink(self.settings.basePath + self.settings.theme.base, self.iframe);
    
    // Insert Editor Stylesheet
    _insertCSSLink(self.settings.basePath + self.settings.theme.editor, self.editorIframeDocument);
    
    // Insert Previewer Stylesheet
    _insertCSSLink(self.settings.basePath + self.settings.theme.preview, self.previewerIframeDocument);

    // Add a relative style to the overall wrapper to keep CSS relative to the editor
    self.iframe.getElementById('epiceditor-wrapper').style.position = 'relative';

    // Now grab the editor and previewer for later use
    self.editor = self.editorIframeDocument.body;
    self.previewer = self.previewerIframeDocument.getElementById('epiceditor-preview');
   
    self.editor.contentEditable = true;
 
    // Firefox's <body> gets all fucked up so, to be sure, we need to hardcode it
    self.iframe.body.style.height = this.element.offsetHeight + 'px';

    // Should actually check what mode it's in!
    this.previewerIframe.style.display = 'none';

    // FIXME figure out why it needs +2 px
    if (_isIE() > -1) {
      this.previewer.style.height = parseInt(_getStyle(this.previewer, 'height'), 10) + 2;
    }

    // Preload the preview theme:
    _insertCSSLink(self.settings.basePath + self.settings.theme.preview, self.previewerIframeDocument, 'theme');

    // If there is a file to be opened with that filename and it has content...
    this.open(self.settings.file.name);

    if (self.settings.focusOnLoad) {
      // We need to wait until all three iframes are done loading by waiting until the parent
      // iframe's ready state == complete, then we can focus on the contenteditable
      self.iframe.addEventListener('readystatechange', function () {
        if (self.iframe.readyState == 'complete') {
          self.editorIframeDocument.body.focus();
        }
      });
    }

    // TODO: Should probably have an ID since we only select one
    // TODO: Should probably have an underscore?
    utilBtns = self.iframe.getElementById('epiceditor-utilbar');

    _elementStates = {}
    _goFullscreen = function (el) {
      
      if (self.eeState.fullscreen) {
        _exitFullscreen(el);
        return;
      }

      if (nativeFs) {
        el.webkitRequestFullScreen();
      }

      _isInEdit = self.eeState.edit;

      // Set the state of EE in fullscreen
      // We set edit and preview to true also because they're visible
      // we might want to allow fullscreen edit mode without preview (like a "zen" mode)
      self.eeState.fullscreen = true;
      self.eeState.edit = true;
      self.eeState.preview = true;

      // Cache calculations
      var windowInnerWidth = window.innerWidth
        , windowInnerHeight = window.innerHeight
        , windowOuterWidth = window.outerWidth
        , windowOuterHeight = window.outerHeight;

      // Without this the scrollbars will get hidden when scrolled to the bottom in faux fullscreen (see #66)
      if (!nativeFs) {
        windowOuterHeight = window.innerHeight;
      }

      // This MUST come first because the editor is 100% width so if we change the width of the iframe or wrapper
      // the editor's width wont be the same as before
      _elementStates.editorIframe = _saveStyleState(self.editorIframe, 'save', {
        'width': windowOuterWidth / 2 + 'px'
      , 'height': windowOuterHeight + 'px'
      , 'float': 'left' // Most browsers
      , 'cssFloat': 'left' // FF
      , 'styleFloat': 'left' // Older IEs
      , 'display': 'block'
      });

      // the previewer
      _elementStates.previewerIframe = _saveStyleState(self.previewerIframe, 'save', {
        'width': windowOuterWidth / 2 + 'px'
      , 'height': windowOuterHeight + 'px'
      , 'float': 'right' // Most browsers
      , 'cssFloat': 'right' // FF
      , 'styleFloat': 'right' // Older IEs
      , 'display': 'block'
      });

      // Setup the containing element CSS for fullscreen
      _elementStates.element = _saveStyleState(self.element, 'save', {
        'position': 'fixed'
      , 'top': '0'
      , 'left': '0'
      , 'width': '100%'
      , 'z-index': '9999' // Most browsers
      , 'zIndex': '9999' // Firefox
      , 'border': 'none'
      , 'margin': '0'
      // Should use the base styles background!
      , 'background': _getStyle(self.editor, 'background-color') // Try to hide the site below
      , 'height': windowInnerHeight + 'px'
      });

      // The iframe element
      _elementStates.iframeElement = _saveStyleState(self.iframeElement, 'save', {
        'width': windowOuterWidth + 'px'
      , 'height': windowInnerHeight + 'px'
      });

      // ...Oh, and hide the buttons and prevent scrolling
      utilBtns.style.visibility = 'hidden';

      if (!nativeFs) {
        document.body.style.overflow = 'hidden';
      }

      self.preview();

      self.editorIframeDocument.body.focus();
    };

    _exitFullscreen = function (el) {
      _saveStyleState(self.element, 'apply', _elementStates.element);
      _saveStyleState(self.iframeElement, 'apply', _elementStates.iframeElement);
      _saveStyleState(self.editorIframe, 'apply', _elementStates.editorIframe);
      _saveStyleState(self.previewerIframe, 'apply', _elementStates.previewerIframe);
     
      // We want to always revert back to the original styles in the CSS so,
      // if it's a fluid width container it will expand on resize and not get
      // stuck at a specific width after closing fullscreen.
      self.element.style.width = '';
      self.element.style.height = '';

      utilBtns.style.visibility = 'visible';
      
      if (!nativeFs) {
        document.body.style.overflow = 'auto';
      }
      else {
        document.webkitCancelFullScreen();
      }
      // Put the editor back in the right state
      // TODO: This is ugly... how do we make this nicer?
      self.eeState.fullscreen = false;
      
      if (_isInEdit) {
        self.edit();
      }
      else {
        self.preview();
      }

      resetWidth(elementsToResize);
    };

    // This setups up live previews by triggering preview() IF in fullscreen on keyup
    self.editor.addEventListener('keyup', function () {
      if (keypressTimer) {
        window.clearTimeout(keypressTimer);
      }
      keypressTimer = window.setTimeout(function () {
        if (self.eeState.fullscreen) {
          self.preview();
        }
      }, 250);
    });
    
    fsElement = self.iframeElement;

    // Sets up the onclick event on utility buttons
    utilBtns.addEventListener('click', function (e) {
      var targetClass = e.target.className;
      if (targetClass.indexOf('epiceditor-toggle-preview-btn') > -1) {
        self.preview();
      }
      else if (targetClass.indexOf('epiceditor-toggle-edit-btn') > -1) {
        self.edit();
      }
      else if (targetClass.indexOf('epiceditor-fullscreen-btn') > -1) {
        _goFullscreen(fsElement);
      }
    });

    // Sets up the NATIVE fullscreen editor/previewer for WebKit
    if (document.body.webkitRequestFullScreen) {
      fsElement.addEventListener('webkitfullscreenchange', function () {
        if (!document.webkitIsFullScreen) {
          _exitFullscreen(fsElement);
        }
      }, false);
    }

    utilBar = self.iframe.getElementById('epiceditor-utilbar');

    // Hide it at first until they move their mouse
    utilBar.style.display = 'none';

    utilBar.addEventListener('mouseover', function () {
      if (utilBarTimer) {
        clearTimeout(utilBarTimer);
      }
    });

    function utilBarHandler(e) {
      // Here we check if the mouse has moves more than 5px in any direction before triggering the mousemove code
      // we do this for 2 reasons:
      // 1. On Mac OS X lion when you scroll and it does the iOS like "jump" when it hits the top/bottom of the page itll fire off
      //    a mousemove of a few pixels depending on how hard you scroll
      // 2. We give a slight buffer to the user in case he barely touches his touchpad or mouse and not trigger the UI
      if (Math.abs(mousePos.y - e.pageY) >= 5 || Math.abs(mousePos.x - e.pageX) >= 5) {
        utilBar.style.display = 'block';
        // if we have a timer already running, kill it out
        if (utilBarTimer) {
          clearTimeout(utilBarTimer);
        }

        // begin a new timer that hides our object after 1000 ms
        utilBarTimer = window.setTimeout(function () {
          utilBar.style.display = 'none';
        }, 1000);
      }
      mousePos = { y: e.pageY, x: e.pageX };
    }
 
    // Add keyboard shortcuts for convenience.
    function shortcutHandler(e) {
      if (e.keyCode == self.settings.shortcut.modifier) { isMod = true } // check for modifier press(default is alt key), save to var
      if (e.keyCode == 17) { isCtrl = true } // check for ctrl/cmnd press, in order to catch ctrl/cmnd + s

      // Check for alt+p and make sure were not in fullscreen - default shortcut to switch to preview
      if (isMod === true && e.keyCode == self.settings.shortcut.preview && !self.eeState.fullscreen) {
        e.preventDefault();
        self.preview();
        // Need this to flip back and forth in Firefox
        self.previewerIframe.focus();
      }
      // Check for alt+o - default shortcut to switch back to the editor
      if (isMod === true && e.keyCode == self.settings.shortcut.edit) {
        e.preventDefault();
        if (!self.eeState.fullscreen) {
          self.edit();
          // Need this to flip back and forth in Firefox
          self.editorIframe.focus();
        }
      }
      // Check for alt+f - default shortcut to make editor fullscreen
      if (isMod === true && e.keyCode == self.settings.shortcut.fullscreen) {
        e.preventDefault();
        _goFullscreen(fsElement);
      }

      // When a user presses "esc", revert everything!
      if (e.keyCode == 27 && self.eeState.fullscreen) {
        if (!document.body.webkitRequestFullScreen) {
          _exitFullscreen(fsElement);
        }
      }

      // Check for ctrl + s (since a lot of people do it out of habit) and make it do nothing
      if (isCtrl === true && e.keyCode == 83) {
        self.save();
        e.preventDefault();
      }

      // Do the same for Mac now (metaKey == cmd).
      if (e.metaKey && e.keyCode == 83) {
        self.save();
        e.preventDefault();
      }

    }
    
    function shortcutUpHandler(e) {
      if (e.keyCode == self.settings.shortcut.modifier) { isMod = false }
      if (e.keyCode == 17) { isCtrl = false }
    }

    // Hide and show the util bar based on mouse movements
    eventableIframes = [self.previewerIframeDocument, self.editorIframeDocument];
    
    for (i = 0; i < eventableIframes.length; i++) {
      eventableIframes[i].addEventListener('mousemove', function (e) {
        utilBarHandler(e);
      });
      eventableIframes[i].addEventListener('scroll', function (e) {
        utilBarHandler(e);
      });
      eventableIframes[i].addEventListener('keyup', function (e) {
        shortcutUpHandler(e);
      });
      eventableIframes[i].addEventListener('keydown', function (e) {
        shortcutHandler(e);
      });
    }

    // Save the document every 100ms by default
    if (self.settings.file.autoSave) {
      self.saveInterval = window.setInterval(function () {
        if (!self._canSave) {
          return;
        }
        self.save();
      }, self.settings.file.autoSave);
    }

    window.addEventListener('resize', function () {
      // If NOT webkit, and in fullscreen, we need to account for browser resizing
      // we don't care about webkit because you can't resize in webkit's fullscreen
      if (!self.iframe.webkitRequestFullScreen && self.eeState.fullscreen) {
        _applyStyles(self.iframeElement, {
          'width': window.outerWidth + 'px'
        , 'height': window.innerHeight + 'px'
        });

        _applyStyles(self.element, {
          'height': window.innerHeight + 'px'
        });

        _applyStyles(self.previewerIframe, {
          'width': window.outerWidth / 2 + 'px'
        , 'height': window.innerHeight + 'px'
        });

        _applyStyles(self.editorIframe, {
          'width': window.outerWidth / 2 + 'px'
        , 'height': window.innerHeight + 'px'
        });
      }
      // Makes the editor support fluid width when not in fullscreen mode
      else if (!self.eeState.fullscreen) {
        resetWidth(elementsToResize);
      }
    });

    self.iframe.close();
    self.eeState.loaded = true;
    self.eeState.unloaded = false;
    // The callback and call are the same thing, but different ways to access them
    callback.call(this);
    this.emit('load');
    return this;
  }