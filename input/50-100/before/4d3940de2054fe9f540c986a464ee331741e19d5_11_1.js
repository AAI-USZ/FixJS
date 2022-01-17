function compress(code) {
	var ast = jsp.parse(code);
	ast = pro.ast_mangle(ast);
	ast = pro.ast_squeeze(ast, { no_warnings: true });
        ast = pro.ast_squeeze_more(ast);
	return pro.gen_code(ast);
}