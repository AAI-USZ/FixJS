function processTssFile(f) {
	// Handle "call" ASTs, where we look for expr() syntax
    function do_call() {
    	if (this[1][1] === 'expr') {
    		var code = pro.gen_code(this[2][0]);
    		var new_ast = ['string', STYLE_EXPR_PREFIX + code];
    		return new_ast;
    	} 
    };

    // Recursively assemble the full name of a dot-notation variable
    function processDot(dot,name) {
    	switch(dot[0]) {
    		case 'dot':
    			return processDot(dot[1], '.' + (dot[2] || '') + name);
    			break;
    		case 'name':
    			var pre = dot[1];
    			if (pre === 'Ti' || pre === 'Titanium' || pre === 'Alloy') {
    				return pre + name;
    			} else {
    				return null;
    			}
    			break;
    	}
    }

    // Handle all AST "dot"s, looking for Titanium constants
    function do_dot() {
    	var name = processDot(this,'');
    	if (name === null) {
    		return null;
    	} else {
    		return ['string', STYLE_EXPR_PREFIX + name];
    	}
    }

    // Generate AST and add the handlers for "call" and "dot" to the AST walker
    var ast = jsp.parse('module.exports = ' + f);
	var walker = pro.ast_walker();
	var new_ast = walker.with_walkers({
		"call": do_call,
		"dot": do_dot
	}, function(){
        return walker.walk(ast);
    });

    // generate code based on the new AST. Make sure to keep keys quoted so the
    // JSON parses without exception. The wild [1][0][1][3] array is how we grab 
    // just the style object from the AST, leaving behind the appended "module.exports = "
    return pro.gen_code(new_ast[1][0][1][3], { 
    	beautify: true, 
    	quote_keys: true,
    	keep_zeroes: true,
    	double_quotes: true
    }) || '';
}