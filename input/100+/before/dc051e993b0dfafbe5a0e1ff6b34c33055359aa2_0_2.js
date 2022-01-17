function() {
		var renamedFile, shortURL;

		shortURL = top.ICEcoder.rightClickedFile.substr((top.ICEcoder.rightClickedFile.indexOf(shortURLStarts)+top.shortURLStarts.length),top.ICEcoder.rightClickedFile.length).replace(/\|/g,"/");
		renamedFile = top.ICEcoder.getInput('Please enter the new name for',shortURL);
		if (renamedFile) {
			for (var i=0;i<top.ICEcoder.openFiles.length;i++) {
				if(top.ICEcoder.openFiles[i]==shortURL.replace(/\|/g,"/")) {
					// rename array item and the tab
					top.ICEcoder.openFiles[i] = renamedFile;
					closeTabLink = '<a nohref onClick="top.ICEcoder.files.contentWindow.closeTab('+(i+1)+')"><img src="images/nav-close.gif" id="closeTabButton'+(i+1)+'" class="closeTab"></a>';
					top.document.getElementById('tab'+(i+1)).innerHTML = top.ICEcoder.openFiles[i] + " " + closeTabLink;
				}
			}
		top.ICEcoder.serverQueue("add","lib/file-control.php?action=rename&file="+renamedFile+"&oldFileName="+top.ICEcoder.rightClickedFile.replace(/\|/g,"/"));
		top.ICEcoder.serverMessage('<b>Renaming to</b><br>'+renamedFile);

		top.ICEcoder.setPreviousFiles();
		}
	}