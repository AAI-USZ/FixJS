function() {

  _.def("Luca.tools.CoffeeEditor")["extends"]("Luca.tools.CodeMirrorField")["with"]({
    name: "coffeescript_editor",
    compileOptions: {
      bare: true
    },
    hooks: ["editor:change"],
    initialize: function(options) {
      var editor;
      this.options = options;
      Luca.tools.CodeMirrorField.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "editorChange");
      editor = this;
      this.state = new Luca.Model({
        currentMode: "coffeescript",
        coffeescript: "",
        javascript: ""
      });
      this.state.bind("change:coffeescript", function(model) {
        var code;
        editor.trigger("change:coffeescript");
        code = model.get("coffeescript");
        return editor.compile(code, function(compiled) {
          return model.set('javascript', compiled);
        });
      });
      return this.state.bind("change:javascript", function(model) {
        var _ref;
        return (_ref = editor.onJavascriptChange) != null ? _ref.call(editor, model.get('javascript')) : void 0;
      });
    },
    compile: function(code, callback) {
      var compiled, response;
      response = {};
      code || (code = this.getValue());
      try {
        compiled = CoffeeScript.compile(code, this.compileOptions);
        if (callback != null) callback.call(this, compiled);
        return response = {
          success: true,
          compiled: compiled
        };
      } catch (error) {
        this.trigger("compile:error", error, code);
        return response = {
          success: false,
          compiled: '',
          message: error.message
        };
      }
    },
    currentMode: function() {
      return this.state.get("currentMode");
    },
    fixTabs: function() {
      var value;
      value = this.getValue(false);
      debugger;
    },
    editorChange: function() {
      this.fixTabs();
      return this.state.set(this.currentMode(), this.getValue());
    }
  });

}