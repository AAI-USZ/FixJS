function(oldName,newName) {
		var shortURL;

		if (!oldName) {
			shortURL = top.ICEcoder.rightClickedFile.substr((top.ICEcoder.rightClickedFile.lastIndexOf(shortURLStarts)+top.shortURLStarts.length),top.ICEcoder.rightClickedFile.length).replace(/\|/g,"/");
			oldName = top.ICEcoder.rightClickedFile.replace(/\|/g,"/");
		} else {
			shortURL = oldName.substr((oldName.lastIndexOf(shortURLStarts)+top.shortURLStarts.length),oldName.length).replace(/\|/g,"/");
		}
		if (!newName) {
			newName = top.ICEcoder.getInput('Please enter the new name for',shortURL);
		}
		if (newName) {
			for (var i=0;i<top.ICEcoder.openFiles.length;i++) {
				if(top.ICEcoder.openFiles[i]==shortURL.replace(/\|/g,"/")) {
					// rename array item and the tab
					top.ICEcoder.openFiles[i] = newName;
					closeTabLink = '<a nohref onClick="top.ICEcoder.files.contentWindow.closeTab('+(i+1)+')"><img src="images/nav-close.gif" id="closeTabButton'+(i+1)+'" class="closeTab"></a>';
					top.document.getElementById('tab'+(i+1)).innerHTML = top.ICEcoder.openFiles[i] + " " + closeTabLink;
				}
			}
		top.ICEcoder.serverQueue("add","lib/file-control.php?action=rename&file="+newName+"&oldFileName="+oldName);
		top.ICEcoder.serverMessage('<b>Renaming to</b><br>'+newName);

		top.ICEcoder.setPreviousFiles();
		}
	}