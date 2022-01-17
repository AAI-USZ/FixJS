function (code) {
	var pro = uglifyjs.uglify;

	var ast = uglifyjs.parser.parse(code);
	ast = pro.ast_mangle(ast);
	ast = pro.ast_squeeze(ast, {keep_comps: false});
	ast = pro.ast_squeeze_more(ast);

	return pro.gen_code(ast);
}