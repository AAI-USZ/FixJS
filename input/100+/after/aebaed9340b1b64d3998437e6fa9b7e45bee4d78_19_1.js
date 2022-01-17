function(frame, is_top)
  {
    // Fall back to document URI if it's inline
    var uri = frame.script_id && runtimes.getScript(frame.script_id)
            ? (runtimes.getScript(frame.script_id).uri || runtimes.getRuntime(frame.rt_id).uri)
            : null;
    return ["li",
             ["span", frame.fn_name, "class", "scope-name"],
             ["span",
              " " + (uri && frame.line ? helpers.basename(uri) + ":" + frame.line : ""),
              "class", "file-line"],
      "handler", "show-frame",
      "ref-id", String(frame.id),
      "title", uri
    ].concat( is_top ? ["class", "selected"] : [] );
  }