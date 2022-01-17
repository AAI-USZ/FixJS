function(code, config) {
	var defines = {},
		DEFINES, ast;

	config = config || {};
	config.deploytype = config.deploytype || 'development';
	config.beautify = config.beautify || true;

	DEFINES = {
		OS_IOS : config.platform == 'ios',
		OS_ANDROID: config.platform == 'android',
		OS_MOBILEWEB: config.platform == 'mobileweb',
		ENV_DEV: config.deploytype == 'development',
		ENV_DEVELOPMENT: config.deploytype == 'development',
		ENV_TEST: config.deploytype == 'test',
		ENV_PRODUCTION: config.deploytype == 'production'
	};

	for (var k in DEFINES) {
		defines[k] = [ "num", DEFINES[k] ? 1 : 0 ];
	}
	
	ast = jsp.parse(code); // parse code and get the initial AST
	ast = pro.ast_mangle(ast,{except:['Ti','Titanium'],defines:defines}); // get a new AST with mangled names
	ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
	
	return pro.gen_code(ast,{beautify:config.beautify}); 
}