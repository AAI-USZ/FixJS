function getListOfFilesInDir(directory)
{
	var retVal;
	var commandToListFiles
	if (TW.platform() == 'Windows')
	{
		commandToListFiles = "cmd /c dir /b \"" + directory.replace(/\//g,"\\") +"\"";
	}
	else
	{
		commandToListFiles = "ls " + directory;
	}
	retVal = TW.system(commandToListFiles, true);

	if(retVal.output == undefined)
	{
		TW.information(null, "Error message", retVal.message);
	}

	return retVal.output;
}