function() {
		var resetFile, shortURL, foundSelectedFile, foundShortURL, foundFile;

		// If we've clicked somewhere other than a file/folder
		if (top.ICEcoder.thisFileFolderLink=="") {
			if (!top.ICEcoder.ctrlKeyDown) {
				// Deselect all files
				for (var i=0;i<=top.ICEcoder.selectedFiles.length;i++) {
					if (top.ICEcoder.selectedFiles[i]) {
						resetFile = top.ICEcoder.filesFrame.contentWindow.document.getElementById(top.ICEcoder.selectedFiles[i]);
						ICEcoder.selectDeselectFile('deselect',resetFile);
					}
				}
				// Set our array to contain 0 items
				top.ICEcoder.selectedFiles.length = 0;
			}
		} else if (top.ICEcoder.thisFileFolderLink) {
			// We clicked a file/folder. Work out a shortened URL for the file, with pipes instead of slashes
			shortURL = top.ICEcoder.thisFileFolderLink.substr((top.ICEcoder.thisFileFolderLink.indexOf(shortURLStarts)+top.shortURLStarts.length),top.ICEcoder.thisFileFolderLink.length).replace(/\//g,"|");
		
			// If we have the CTRL key down
			if (top.ICEcoder.ctrlKeyDown) {
				foundSelectedFile=false;
				// Deselect previously selected file?
				for (i=0;i<=top.ICEcoder.selectedFiles.length;i++) {
					if (top.ICEcoder.selectedFiles[i]==shortURL) {
						resetFile = ICEcoder.filesFrame.contentWindow.document.getElementById(top.ICEcoder.selectedFiles[i]);
						ICEcoder.selectDeselectFile('deselect',resetFile);
						top.ICEcoder.selectedFiles.splice(i);
						foundSelectedFile=true;
					}
				}
				if (!foundSelectedFile) {
					foundFile = ICEcoder.filesFrame.contentWindow.document.getElementById(shortURL);
					ICEcoder.selectDeselectFile('select',foundFile);
					top.ICEcoder.selectedFiles.push(shortURL);
				}
			// We are single clicking
			} else {
				// First deselect all files
				for (i=0;i<top.ICEcoder.selectedFiles.length;i++) {
					resetFile = ICEcoder.filesFrame.contentWindow.document.getElementById(top.ICEcoder.selectedFiles[i]);
					ICEcoder.selectDeselectFile('deselect',resetFile);
				}
				// Set our arrray to contain 0 items
				top.ICEcoder.selectedFiles.length = 0;

				// Add our URL and highlight the file
				top.ICEcoder.selectedFiles.push(shortURL);
				foundFile = ICEcoder.filesFrame.contentWindow.document.getElementById(shortURL);
				ICEcoder.selectDeselectFile('select',foundFile);
			}
		}
		// Adjust the file & replace select values depending on if we have files selected
		if (!top.ICEcoder.selectedFiles[0]) {
			document.findAndReplace.target[2].innerHTML = "all files";
			document.findAndReplace.target[3].innerHTML = "all filenames";
		} else {
			document.findAndReplace.target[2].innerHTML = "selected files";
			document.findAndReplace.target[3].innerHTML = "selected filenames";
		}
		// Finally, show or grey out the relevant file manager icons
		top.ICEcoder.selectedFiles.length == 1 ? top.ICEcoder.fMIconVis('fMOpen',1) : top.ICEcoder.fMIconVis('fMOpen',0.3);
		top.ICEcoder.selectedFiles.length == 1 && top.ICEcoder.thisFileFolderType == "folder" ? top.ICEcoder.fMIconVis('fMNewFile',1) : top.ICEcoder.fMIconVis('fMNewFile',0.3);
		top.ICEcoder.selectedFiles.length == 1 && top.ICEcoder.thisFileFolderType == "folder" ? top.ICEcoder.fMIconVis('fMNewFolder',1) : top.ICEcoder.fMIconVis('fMNewFolder',0.3);
		top.ICEcoder.selectedFiles.length > 0  ? top.ICEcoder.fMIconVis('fMDelete',1) : top.ICEcoder.fMIconVis('fMDelete',0.3);
		top.ICEcoder.selectedFiles.length == 1 ? top.ICEcoder.fMIconVis('fMRename',1) : top.ICEcoder.fMIconVis('fMRename',0.3);
		// Hide the file menu incase it's showing
		top.document.getElementById('fileMenu').style.display = "none";
	}