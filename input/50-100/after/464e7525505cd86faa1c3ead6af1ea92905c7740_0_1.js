function findNodeModulesPackage(path, name)
{
	if (PATH.existsSync(path + "/node_modules/" + name + "/package.json"))
	{
		return FS.realpathSync(path + "/node_modules/" + name);
	}
	else
	if (PATH.dirname(path) !== path)
	{
		return findNodeModulesPackage(PATH.dirname(path), name);
	}
	return false;	
}