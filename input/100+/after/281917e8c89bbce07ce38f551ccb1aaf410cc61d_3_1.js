function(code, config, fn) 
{
	function show_copyright(comments) {
	        var ret = "";
	        for (var i = 0; i < comments.length; ++i) {
	                var c = comments[i];
	                if (c.type == "comment1") {
	                        ret += "//" + c.value + "\n";
	                } else {
	                        ret += "/*" + c.value + "*/";
	                }
	        }
	        return ret;
	};
	var c = jsp.tokenizer(code)();
	// extract header copyright so we can preserve it (if at the top of the file)
    var copyrights = show_copyright(c.comments_before);
	var ast = jsp.parse(code); 
	var newCode = exports.formatAST(ast,config,fn);
	return (copyrights ? copyrights + '\n' : '' ) + newCode;
}