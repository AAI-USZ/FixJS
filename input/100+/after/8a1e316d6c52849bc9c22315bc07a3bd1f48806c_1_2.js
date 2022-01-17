function() {
  var ComponentPicker, bufferNames, compiledBuffers, defaults;

  defaults = {};

  defaults.setup = "# the setup tab contains code which is run every time\n# prior to the 'implementation' run";

  defaults.component = "# the component tab is where you handle the definition of the component\n# that you are trying to test.  it will render its output into the\n# output panel of the code tester\n#\n# example definition:\n#\n# _.def('MyComponent').extends('Luca.View').with\n#   bodyTemplate: 'sample/welcome'";

  defaults.teardown = "# the teardown tab is where you undo / cleanup any of the operations\n# from setup / implementation";

  defaults.implementation = "# the implementation tab is where you specify options for your component.\n#\n# NOTE: the component tester uses whatever is returned from evalulating\n# the code in this tab.  if it responds to render(), it will append\n# render().el to the output panel.  if it is an object, then we will attempt\n# to create an instance of the component you defined with the object as";

  defaults.style = "/*\n * customize the styles that effect this component\n * note, all styles here will be scoped to only effect\n * the output panel :)\n*/";

  defaults.html = "";

  bufferNames = ["setup", "implementation", "component", "style", "html"];

  compiledBuffers = ["setup", "implementation", "component"];

  ComponentPicker = Luca.fields.TypeAheadField.extend({
    name: "component_picker",
    label: "Choose a component to edit",
    initialize: function() {
      this.collection = new Luca.collections.Components();
      this.collection.fetch();
      return this._super("initialize", this, arguments);
    },
    getSource: function() {
      return this.collection.classes();
    },
    change_handler: function() {
      var component, componentDefinition,
        _this = this;
      componentDefinition = this.getValue();
      component = this.collection.find(function(model) {
        return model.get("className") === componentDefinition;
      });
      component.fetch({
        success: function(model, response) {
          if ((response != null ? response.source.length : void 0) > 0) {
            return _this.trigger("component:fetched", response.source, response.className);
          }
        }
      });
      return this.hide();
    },
    createWrapper: function() {
      return this.make("div", {
        "class": "component-picker span4 well",
        style: "position: absolute; z-index:12000"
      });
    },
    show: function() {
      return this.$el.parent().show();
    },
    hide: function() {
      return this.$el.parent().hide();
    },
    toggle: function() {
      return this.$el.parent().toggle();
    }
  });

  _.def("Luca.tools.ComponentTester")["extends"]("Luca.core.Container")["with"]({
    id: "component_tester",
    name: "component_tester",
    className: "span11",
    autoEvaluateCode: true,
    components: [
      {
        ctype: 'card_view',
        name: "component_detail",
        activeCard: 0,
        components: [
          {
            ctype: 'panel',
            name: "component_tester_output",
            bodyTemplate: "component_tester/help"
          }
        ]
      }, {
        ctype: "code_editor",
        name: "ctester_edit",
        className: 'font-large fixed-height',
        minHeight: '350px',
        styles: {
          "position": "absolute",
          "bottom": "0px",
          "width": "96%"
        },
        currentBuffers: defaults,
        compiledBuffers: ["component", "setup", "implementation"],
        topToolbar: {
          buttons: [
            {
              icon: "resize-full",
              align: "right",
              description: "change the size of the component tester editor",
              eventId: "toggle:size"
            }, {
              icon: "pause",
              align: "right",
              description: "Toggle auto-evaluation of test script on code change",
              eventId: "click:autoeval"
            }, {
              icon: "plus",
              description: "add a new component to test",
              eventId: "click:add"
            }, {
              icon: "folder-open",
              description: "open an existing component's definition",
              eventId: "click:open"
            }
          ]
        },
        bottomToolbar: {
          buttons: [
            {
              group: true,
              wrapper: "span4",
              buttons: [
                {
                  label: "View Javascript",
                  description: "Switch between compiled JS and Coffeescript",
                  eventId: "toggle:mode"
                }
              ]
            }, {
              group: true,
              wrapper: "span6 offset4",
              buttons: [
                {
                  label: "Component",
                  eventId: "edit:component",
                  description: "Edit the component itself"
                }, {
                  label: "Setup",
                  eventId: "edit:setup",
                  description: "Edit the setup for your component test"
                }, {
                  label: "Implementation",
                  eventId: "edit:implementation",
                  description: "Implement your component"
                }, {
                  label: "Markup",
                  eventId: "edit:markup",
                  description: "Edit the HTML produced by the component"
                }, {
                  label: "CSS",
                  eventId: "edit:style",
                  description: "Edit CSS"
                }
              ]
            }, {
              group: true,
              align: "right",
              buttons: [
                {
                  icon: "question-sign",
                  align: "right",
                  eventId: "click:help",
                  description: "Help"
                }, {
                  icon: "cog",
                  align: 'right',
                  eventId: "click:settings",
                  description: "component tester settings"
                }, {
                  icon: "eye-close",
                  align: "right",
                  eventId: "click:hide",
                  description: "hide the tester controls"
                }, {
                  icon: "heart",
                  eventId: "click:console",
                  description: "Coffeescript Console",
                  align: "right"
                }
              ]
            }
          ]
        }
      }
    ],
    debugMode: true,
    componentEvents: {
      "ctester_edit click:autoeval": "toggleAutoeval",
      "ctester_edit click:refresh": "refreshCode",
      "ctester_edit click:hide": "toggleControls",
      "ctester_edit click:settings": "toggleSettings",
      "ctester_edit click:add": "addComponent",
      "ctester_edit click:open": "openComponent",
      "ctester_edit click:help": "showHelp",
      "ctester_edit click:console": "toggleConsole",
      "ctester_edit eval:error": "onError",
      "ctester_edit eval:success": "onSuccess",
      "ctester_edit edit:setup": "editSetup",
      "ctester_edit edit:teardown": "editTeardown",
      "ctester_edit edit:component": "editComponent",
      "ctester_edit edit:style": "editStyle",
      "ctester_edit edit:markup": "editMarkup",
      "ctester_edit edit:implementation": "editImplementation",
      "ctester_edit toggle:keymap": "toggleKeymap",
      "ctester_edit toggle:mode": "toggleMode",
      "ctester_edit code:change:html": "onMarkupChange",
      "ctester_edit code:change:style": "onStyleChange",
      "ctester_edit toggle:size": "toggleSize"
    },
    initialize: function() {
      var key, value, _ref;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      _ref = this.componentEvents;
      for (key in _ref) {
        value = _ref[key];
        this[value] = _.bind(this[value], this);
      }
      return this.defer("editComponent").until("after:render");
    },
    afterRender: function() {
      var changeHandler,
        _this = this;
      changeHandler = _.idleMedium(function() {
        if (_this.autoEvaluateCode === true) return _this.applyTestRun();
      }, 500);
      return this.getEditor().bind("code:change", changeHandler);
    },
    getEditor: function() {
      return Luca("ctester_edit");
    },
    getDetail: function() {
      return Luca("component_detail");
    },
    getOutput: function() {
      return this.getDetail().findComponentByName("component_tester_output");
    },
    onError: function(error, bufferId) {
      return console.log("Error in " + bufferId, error, error.message, error.stack);
    },
    onSuccess: function(result, bufferId) {
      var object;
      if (bufferId === "component") this.componentDefinition = result;
      if (bufferId === "implementation") {
        if (Luca.isBackboneView(result)) {
          object = result;
        } else if (_.isObject(result) && (result.ctype != null)) {
          object = Luca(result);
        } else if (_.isObject(result) && _.isFunction(this.componentDefinition)) {
          object = new this.componentDefinition(result);
        }
        if (Luca.isBackboneView(object)) {
          return this.getOutput().$html(object.render().el);
        }
      }
    },
    applyTestRun: function() {
      var bufferId, code, _ref, _results;
      this.getOutput().$html('');
      _ref = this.getTestRun();
      _results = [];
      for (bufferId in _ref) {
        code = _ref[bufferId];
        _results.push(this.evaluateCode(code, bufferId));
      }
      return _results;
    },
    toggleConsole: function(button) {
      var container;
      this.developmentConsole = Luca("coffeescript-console", function() {
        return new Luca.tools.DevelopmentConsole({
          name: "coffeescript-console"
        });
      });
      if (!this.consoleContainerAppended) {
        container = this.make("div", {
          id: "devtools-console-wrapper",
          "class": "devtools-console-container modal",
          style: "width:900px;height:650px;"
        }, this.developmentConsole.el);
        $('body').append(container);
        this.consoleContainerAppended = true;
        this.developmentConsole.render();
      }
      return $('#devtools-console-wrapper').modal({
        backdrop: false,
        show: true
      });
    },
    toggleAutoeval: function(button) {
      var buttonClass, iconHolder;
      this.autoEvaluateCode = !(this.autoEvaluateCode === true);
      if (!this.started && this.autoEvaluateCode === true) {
        this.started = true;
        this.applyTestRun();
      }
      iconHolder = button.children('i').eq(0);
      buttonClass = this.autoEvaluateCode ? "icon-pause" : "icon-play";
      iconHolder.removeClass();
      iconHolder.addClass(buttonClass);
      return this;
    },
    showEditor: function(options) {
      this.getEditor().$('.toolbar-container.top').toggle(options);
      this.getEditor().$('.codemirror-wrapper').toggle(options);
      return this.trigger("controls:toggled");
    },
    toggleKeymap: function(button) {
      var newMode;
      newMode = this.getEditor().keyMap === "vim" ? "basic" : "vim";
      this.getEditor().setKeyMap(newMode);
      return button.html(_.string.capitalize(newMode));
    },
    toggleMode: function(button) {
      var newMode;
      newMode = this.getEditor().mode === "coffeescript" ? "javascript" : "coffeescript";
      this.getEditor().setMode(newMode);
      button.html(_.string.capitalize((newMode === "coffeescript" ? "View Javascript" : "View Coffeescript")));
      return this.editBuffer(this.currentBufferName, newMode === "javascript");
    },
    currentSize: 1,
    sizes: [
      {
        icon: "resize-full",
        value: function() {
          return $(window).height() * 0.3;
        }
      }, {
        icon: "resize-small",
        value: function() {
          return $(window).height() * 0.6;
        }
      }
    ],
    toggleSize: function(button) {
      var iconHolder, index, newIcon, newSize;
      index = this.currentSize++ % this.sizes.length;
      newSize = this.sizes[index].value();
      newIcon = this.sizes[index].icon;
      if (button != null) {
        iconHolder = button.children('i').eq(0);
        iconHolder.removeClass().addClass("icon-" + newIcon);
      }
      this.$('.codemirror-wrapper').css('height', "" + (parseInt(newSize)) + "px");
      return this.getEditor().refresh();
    },
    toggleControls: function(button) {
      var _this = this;
      this.bind("controls:toggled", function() {
        var buttonClass, iconHolder;
        iconHolder = button.children('i').eq(0);
        iconHolder.removeClass();
        buttonClass = _this.getEditor().$('.toolbar-container.top').is(":visible") ? "icon-eye-close" : "icon-eye-open";
        return iconHolder.addClass(buttonClass);
      });
      this.showEditor();
      return this;
    },
    toggleSettings: function() {
      return this;
    },
    setValue: function(value, buffer) {
      var compiled;
      if (buffer == null) buffer = "component";
      compiled = this.getEditor().editor.getOption('mode') === "javascript";
      return this.editBuffer(buffer, compiled, false).getEditor().setValue(value);
    },
    editBuffer: function(currentBufferName, compiled, autoSave) {
      var buffer;
      this.currentBufferName = currentBufferName;
      if (compiled == null) compiled = false;
      if (autoSave == null) autoSave = true;
      this.showEditor(true);
      this.highlight(this.currentBufferName);
      buffer = compiled ? "compiled_" + this.currentBufferName : this.currentBufferName;
      this.getEditor().loadBuffer(buffer, autoSave);
      return this;
    },
    editMarkup: function() {
      this.getEditor().setMode('htmlmixed');
      this.getEditor().setWrap(true);
      return this.editBuffer("html").setValue(this.getOutput().$html(), 'html');
    },
    editStyle: function() {
      this.getEditor().setMode('css');
      return this.editBuffer("style");
    },
    editComponent: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("component");
    },
    editTeardown: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("teardown");
    },
    editSetup: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("setup");
    },
    editImplementation: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("implementation");
    },
    getTestRun: function() {
      var buffer, editor, testRun, _i, _len, _ref;
      editor = this.getEditor();
      testRun = {};
      _ref = ["component", "setup", "implementation"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        buffer = _ref[_i];
        testRun[buffer] = editor.getBuffer(buffer, true);
      }
      return testRun;
    },
    getContext: function() {
      return Luca.util.resolve(this.context || (this.context = "window"));
    },
    evaluateCode: function(code, bufferId, compile) {
      var compiled, evaluator, result;
      if (compile == null) compile = false;
      code || (code = this.getEditor().getValue());
      compiled = compile === true ? this.getEditor().compileCode(code) : code;
      evaluator = function() {
        return eval(compiled);
      };
      try {
        result = evaluator.call(this.getContext());
        return this.onSuccess(result, bufferId, code);
      } catch (error) {
        return this.onError(error, bufferId, code);
      }
    },
    onMarkupChange: function() {
      if (this.autoEvaluateCode === true) {
        return this.getOutput().$html(this.getEditor().getValue());
      }
    },
    onStyleChange: function() {
      var style, styleTag, _ref;
      if (this.autoEvaluateCode === true) {
        $('#component-tester-stylesheet').remove();
        style = (_ref = this.getEditor()) != null ? _ref.getValue() : void 0;
        if (style) {
          styleTag = this.make("style", {
            type: "text/css",
            id: "component-tester-stylesheet"
          });
          $('head').append(styleTag);
          return $(styleTag).append(style);
        }
      }
    },
    showHelp: function() {
      return this.getOutput().$html(Luca.template("component_tester/help", this));
    },
    addComponent: function(button) {},
    openComponent: function(button) {
      var _this = this;
      this.componentPicker || (this.componentPicker = new ComponentPicker());
      this.componentPicker.bind("component:fetched", function(source, component) {
        return _this.setEditorNamespace(component).setValue(source, "component");
      });
      if (!this.getEditor().$('.component-picker').length > 0) {
        this.getEditor().$('.codemirror-wrapper').before(this.componentPicker.createWrapper());
        this.getEditor().$('.component-picker').html(this.componentPicker.render().el);
        this.componentPicker.show();
        return;
      }
      return this.componentPicker.toggle();
    },
    highlight: function(section) {
      this.$("a.btn[data-eventid='edit:" + section + "']").siblings().css('font-weight', 'normal');
      return this.$("a.btn[data-eventid='edit:" + section + "']").css('font-weight', 'bold');
    },
    setEditorNamespace: function(namespace) {
      this.getEditor().namespace(namespace);
      this.getEditor().buffers.fetch();
      return this;
    }
  });

}