function optimize(done) {
  var config = {
    name: name,
    out: out,
    // use none optimize for debugging
    // optimize: "none",
    optimize: 'uglify',
    uglify: {
      // beautify for debugging
      // beautify: true,
      mangle: true
    },
    // TODO  above config setting is temporary, it shuould use mainConfigFile
    // https://github.com/toolness/friendlycode/pull/112#issuecomment-6625412
    // mainConfigFile: "./js/main.js",
    baseUrl: "js",
    shim: {
      underscore: {
        exports: "_"
      },
      jquery: {
        exports: "$"
      },
      "jquery-tipsy": {
        deps: ["jquery"],
        exports: "$"
      },
      "jquery-slowparse": {
        deps: ["jquery"],
        exports: "$"
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      codemirror: {
        exports: "CodeMirror"
      },
      "codemirror/xml": {
        deps: ["codemirror"],
        exports: "CodeMirror"
      },
      "codemirror/javascript": {
        deps: ["codemirror"],
        exports: "CodeMirror"
      },
      "codemirror/css": {
        deps: ["codemirror"],
        exports: "CodeMirror"
      },
      "codemirror/html": {
        deps: [
          "codemirror/xml",
          "codemirror/javascript",
          "codemirror/css"
        ],
        exports: "CodeMirror"
      }
    },
    paths: {
      jquery: "jquery.min",
      "jquery-tipsy": "jquery.tipsy",
      "jquery-slowparse": "../slowparse/spec/errors.jquery",
      underscore: "underscore.min",
      backbone: "backbone.min",
      slowparse: "../slowparse",
      codemirror: "../codemirror2/lib/codemirror",
      "codemirror/xml": "../codemirror2/mode/xml/xml",
      "codemirror/javascript": "../codemirror2/mode/javascript/javascript",
      "codemirror/css": "../codemirror2/mode/css/css",
      "codemirror/html": "../codemirror2/mode/htmlmixed/htmlmixed"
    }
  };
  requirejs.optimize(config, done);
}