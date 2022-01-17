function(fileLink) {
		if (fileLink) {
			top.ICEcoder.thisFileFolderLink=fileLink;
			top.ICEcoder.thisFileFolderType="file";
		}
		if (top.ICEcoder.thisFileFolderLink!="" && top.ICEcoder.thisFileFolderType=="file") {
			var shortURL, canOpenFile;

			// work out a shortened URL for the file
			shortURL = top.ICEcoder.thisFileFolderLink.replace(/\|/g,"/");
			shortURL = shortURL.substr((shortURL.lastIndexOf(shortURLStarts)+shortURLStarts.length),shortURL.length);

			// No reason why we can't open a file (so far)
			canOpenFile = true;

			// Limit to 10 files open at a time
			if (top.ICEcoder.openFiles.length<10) {
				// check if we've already got it in our array
				for (var i=0;i<top.ICEcoder.openFiles.length;i++) {
					if (top.ICEcoder.openFiles[i]==shortURL && shortURL!="/[NEW]") {
						// we have, so don't bother opening again
						canOpenFile = false;
						// instead, switch to that tab
						top.ICEcoder.switchTab(i+1);
					}
				}
			} else {
			// show a message because we have 10 files open
				top.ICEcoder.message('Sorry, you can only have 10 files open at a time!');
				canOpenFile = false;
			}

			// if we're still OK to open it...
			if (canOpenFile) {
				top.ICEcoder.shortURL = shortURL;
				if (shortURL!="/[NEW]") {
					// replace forward slashes with pipes so it get be placed in a querystring
					top.ICEcoder.thisFileFolderLink = top.ICEcoder.thisFileFolderLink.replace(/\//g,"|");
					top.ICEcoder.serverQueue("add","lib/file-control.php?action=load&file="+top.ICEcoder.thisFileFolderLink);
					top.ICEcoder.serverMessage('<b>Opening File</b><br>'+top.ICEcoder.shortURL);
				} else {
					top.ICEcoder.createNewTab();
				}
				top.ICEcoder.fMIconVis('fMView',1);
			}
		}
	}