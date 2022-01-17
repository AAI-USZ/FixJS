function (src, dst, force, symlink)
{
	if (fs.existsSync(dst) && !force)
	{
		// already exists, no force
		return -1;
	}

	if (symlink)
	{
		fs.symlinkSync(src, dst, 'file');
		return 0;
	}

	var data = fs.readFileSync(src);
	return fs.writeFileSync(dst, data);
}