function (dst, data, force)
{
	try
	{
		if (path.existsSync(dst) && !force)
			throw filePath + " already exists";

		var fd = fs.openSync(dst, 'w');
		fs.writeSync(fd, data);
		fs.close(fd);
	}
	catch (e)
	{
		return -1;
	}

	return 0;
}