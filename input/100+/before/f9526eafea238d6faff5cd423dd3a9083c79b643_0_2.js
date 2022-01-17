function Haml(haml, config) {
    if(typeof(config) != "object"){
      forceXML = config;
      config = {};
    }
    
    var escaper;
    if(config.customEscape){
      escaper = "";
      escaperName = config.customEscape;
    }else{
      escaper = html_escape.toString() + "\n";
      escaperName = "html_escape";
    }
    
    escapeHtmlByDefault = (config.escapeHtmlByDefault || config.escapeHTML || config.escape_html);
    
    var js = optimize(compile(haml));
    
    var str = "with(locals || {}) {\n" +
    "  try {\n" +
    "   var _$output=" + js + ";\n return _$output;" +
    "  } catch (e) {\n" +
    "    return \"\\n<pre class='error'>\" + "+escaperName+"(e.stack) + \"</pre>\\n\";\n" +
    "  }\n" +
    "}"

    try{
      var f = new Function("locals",  escaper + str );
      return f;
    }catch(e){
      if ( typeof(console) !== 'undefined' ) { console.error(str); }
      throw e;
    }
  }