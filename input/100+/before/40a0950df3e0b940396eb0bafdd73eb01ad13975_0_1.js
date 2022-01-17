function(exports, require, module) {
  (function() {
    var any, read_settings_from_cookie, store_settings_to_cookie, the, unpacker_filter;

    any = function(a, b) {
      return a || b;
    };

    read_settings_from_cookie = function() {
      $("#tabsize").val(any($.cookie("tabsize"), "4"));
      $("#brace-style").val(any($.cookie("brace-style"), "collapse"));
      $("#detect-packers").attr("checked", $.cookie("detect-packers") !== "off");
      $("#preserve-newlines").attr("checked", $.cookie("preserve-newlines") !== "off");
      $("#keep-array-indentation").attr("checked", $.cookie("keep-array-indentation") === "on");
      $("#indent-scripts").val(any($.cookie("indent-scripts"), "normal"));
      return $("#space-before-conditional").attr("checked", $.cookie("space-before-conditional") !== "off");
    };

    store_settings_to_cookie = function() {
      var opts;
      opts = {
        expires: 360
      };
      $.cookie("tabsize", $("#tabsize").val(), opts);
      $.cookie("brace-style", $("#brace-style").val(), opts);
      $.cookie("detect-packers", ($("#detect-packers").attr("checked") ? "on" : "off"), opts);
      $.cookie("preserve-newlines", ($("#preserve-newlines").attr("checked") ? "on" : "off"), opts);
      $.cookie("keep-array-indentation", ($("#keep-array-indentation").attr("checked") ? "on" : "off"), opts);
      $.cookie("space-before-conditional", ($("#space-before-conditional").attr("checked") ? "on" : "off"), opts);
      return $.cookie("indent-scripts", $("#indent-scripts").val(), opts);
    };

    unpacker_filter = function(source) {
      var comment, found, trailing_comments, _results;
      trailing_comments = "";
      comment = "";
      found = false;
      _results = [];
      while (true) {
        found = false;
        if (/^\s*\/\*/.test(source)) {
          found = true;
          comment = source.substr(0, source.indexOf("*/") + 2);
          source = source.substr(comment.length).replace(/^\s+/, "");
          trailing_comments += comment + "\n";
        } else if (/^\s*\/\//.test(source)) {
          found = true;
          comment = source.match(/^\s*\/\/.*/)[0];
          source = source.substr(comment.length).replace(/^\s+/, "");
          trailing_comments += comment + "\n";
        }
        if (!found) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    exports.beautify = function(ed$) {
      var brace_style, comment_mark, indent_char, indent_scripts, indent_size, keep_array_indentation, opts, preserve_newlines, source, space_before_conditional;
      if (the.beautify_in_progress) return;
      the.beautify_in_progress = true;
      source = ed$.html();
      indent_size = $("#tabsize").val();
      indent_char = (indent_size === 1 ? "\t" : " ");
      preserve_newlines = $("#preserve-newlines").attr("checked");
      keep_array_indentation = $("#keep-array-indentation").attr("checked");
      indent_scripts = $("#indent-scripts").val();
      brace_style = $("#brace-style").val();
      space_before_conditional = $("#space-before-conditional").attr("checked");
      if ($("#detect-packers").attr("checked")) source = unpacker_filter(source);
      comment_mark = "<-" + "-";
      opts = {
        indent_size: 4,
        indent_char: " ",
        preserve_newlines: true,
        brace_style: "collapse",
        keep_array_indentation: false,
        space_after_anon_function: true,
        space_before_conditional: true,
        indent_scripts: "normal"
      };
      if (source && source[0] === "<" && source.substring(0, 4) !== comment_mark) {
        $("#resultText").val(style_html(source, opts));
      } else {
        $("#resultText").val(js_beautify(unpacker_filter(source), opts));
      }
      return the.beautify_in_progress = false;
    };

    the = {
      beautify_in_progress: false
    };

  }).call(this);
  
}