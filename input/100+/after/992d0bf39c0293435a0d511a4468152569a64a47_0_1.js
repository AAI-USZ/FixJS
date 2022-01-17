function envFileContent(cmdOptions) {
  var filePath, envFiles;
  var fileContent = '';
  if (cmdOptions.env) {
    envFiles = cmdOptions.env.split(',');
    for (var i = 0; i < envFiles.length; i++ ) {
      filePath = path.normalize(envFiles[i]);
      if (fs.existsSync(filePath)) {
	fileContent += fs.readFileSync(filePath, 'utf8');
	fileContent += "\n";
      }
    }
  } else if (fs.existsSync(parser.cmdWorkingDir(cmdOptions) + '/.env')) {
    filePath = parser.cmdWorkingDir(cmdOptions) + '/.env';
    fileContent = fs.readFileSync(filePath, 'utf8');
  }

  return fileContent;
}