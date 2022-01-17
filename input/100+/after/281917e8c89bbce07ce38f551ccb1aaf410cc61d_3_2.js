function(ast,config,fn)
{
	// use the general defaults from the uglify command line
	var defines = {},
		DEFINES, 
		config;

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

	var isDev = config.deploytype === 'development';
	var options = 
	{
	        ast: false,
	        consolidate: !isDev,
	        mangle: !isDev,
	        mangle_toplevel: false,
	        no_mangle_functions: false,
	        squeeze: !isDev,
	        make_seqs: !isDev,
	        dead_code: true,
	        unsafe: false,
	        defines: defines,
	        lift_vars: false,
	        codegen_options: {
	                ascii_only: false,
	                beautify: config.beautify,
	                indent_level: 4,
	                indent_start: 0,
	                quote_keys: false,
	                space_colon: false,
	                inline_script: false
	        },
	        make: false,
	        output: false,
			except: ['Ti','Titanium']
	};

	ast = pro.ast_mangle(ast,options); // get a new AST with mangled names
	ast = optimizer.optimize(ast, DEFINES, fn); // optimize our titanium based code
	ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
	return pro.gen_code(ast,options.codegen_options); 
}