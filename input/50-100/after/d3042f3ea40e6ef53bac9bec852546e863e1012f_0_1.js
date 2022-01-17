function() {
        try{
			var ast = jsp.parse(orig_code);
	        // parse code and get the initial AST
	        ast = pro.ast_mangle(ast);
	        // get a new AST with mangled names
	        ast = pro.ast_squeeze(ast);
	        // get an AST with compression optimizations
	        var final_code = pro.gen_code(ast);
	        // compressed code here
			
		} catch(err){
			callback(null,err);
			return;
		}
		
        out.write(final_code);
        out.end();
    }