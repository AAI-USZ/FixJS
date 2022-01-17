function makeRequiresRelative(fn,resourcesDir,config)
{
	var basedir = path.dirname(path.resolve(fn));
	var code = String(fs.readFileSync(fn,'utf-8'));
	var ast = jsp.parse(code); 
	var w = pro.ast_walker();
	var requires = [];

	function processCall() 
	{
		var entries = this[1];
		if (entries[0] == 'dot')
		{
			entries = entries[1];
		}
		if (entries[0]=='name' && entries[1]=='require')
		{
			var name = this[2][0][1];
			var requirePath = makeFullPath(basedir,name);
			var relative = requirePath.substring(resourcesDir.length + 1);
			if (relative)
			{
				// re-write to be relative
				this[2][0][1] = trimExtension(relative);
			}
		}
		return this;
	}
	
	var ast = w.with_walkers({"call" : processCall}, function()
	{
		return w.walk(ast);
	});
	
	return U.formatAST(ast,config,fn);
}