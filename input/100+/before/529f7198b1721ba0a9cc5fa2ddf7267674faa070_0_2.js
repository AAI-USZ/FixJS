function() {
		var newFolder, shortURL;

		shortURL = top.ICEcoder.rightClickedFile.substr((top.ICEcoder.rightClickedFile.indexOf(shortURLStarts)+top.shortURLStarts.length),top.ICEcoder.rightClickedFile.length).replace(/\|/g,"/");
		newFolder = top.ICEcoder.getInput('Enter New Folder Name at '+shortURL+'/','');
		if (newFolder) {
			newFolder = shortURL + "/" + newFolder;
			top.ICEcoder.serverQueue("add","lib/file-control.php?action=newFolder&file="+newFolder.replace(/\//g,"|"));
			top.ICEcoder.serverMessage('<b>Creating Folder</b><br>'+newFolder);
		}
	}