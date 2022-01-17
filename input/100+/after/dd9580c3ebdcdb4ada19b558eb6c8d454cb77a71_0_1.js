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

	if(retVal.status == 1)
	{
		showObject(retVal, "Execution of system command failed")
	}
	if(retVal.status == 2)
	{
		TW.information(null, "Additional permissions required", "For completion of filenames you need to allow scripts to execute system commands. Edit -> Preferences -> Scripts -> Allow scripts to run system commands.");
	}

	return retVal.output;
}