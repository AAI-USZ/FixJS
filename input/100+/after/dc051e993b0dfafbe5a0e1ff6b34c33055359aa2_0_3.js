function(action,location,file,perms,oldName) {
		var actionElemType, cssStyle, hrefLink, targetElem, locNest, newUL, newLI, nameLI, shortURL, newMouseOver;

		// Adding files
		if (action=="add") {

			// Determin if this is a file or folder and based on that, set the CSS styling & link
			file.indexOf(".")>-1 ? actionElemType = "file" : actionElemType = "folder";
			actionElemType=="file" ? cssStyle = "pft-file ext-" + file.substr(file.indexOf(".")+1,file.length) : cssStyle = "pft-directory";
			actionElemType=="file" ? hrefLink = "nohref" : hrefLink = "href=\"#\"";

			// Identify our target element & the first child element in it's location
			targetElem = document.getElementById('filesFrame').contentWindow.document.getElementById(location.replace(/\//g,"|"));
			locNest = targetElem.parentNode.parentNode.childNodes[1];

			// If we don't have a nest location, it's an empty folder
			if(!locNest) {

				// We now need to begin a new UL list
				newUL = document.createElement("ul");
				locNest = targetElem.parentNode.parentNode;
				locNest.appendChild(newUL);

				// Now we have a list to insert into, we can identify the first child element
				locNest = targetElem.parentNode.parentNode.childNodes[1];

				// Finally we can add the first list item for this file/folder we're adding
				newLI = document.createElement("li");
				newLI.className = cssStyle;
				newLI.innerHTML = '<a '+hrefLink+' onMouseOver="top.ICEcoder.overFileFolder(\''+actionElemType+'\',\''+fullPath+location+'/'+file+'\')" onMouseOut="top.ICEcoder.overFileFolder(\''+actionElemType+'\',\'\')" style="position: relative; left:-22px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="'+location.replace(/\//g,"|")+'|'+file+'">'+file+'</a>';
				locNest.appendChild(newLI,locNest.childNodes[0]);

			// There are items in that location, so add our new item in the right position
			} else {

				for (var i=0;i<=locNest.childNodes.length-1;i++) {
					// Identify if the item we're considering is a file or folder
					locNest.childNodes[i].className.indexOf('directory')>0 ? elemType = "folder" : elemType = "file";
					
					// Get the name of the item
					nameLI = locNest.childNodes[i].getElementsByTagName('span')[0].innerHTML;

					// If it's of the same type & the name is greater, or we're adding a folder and it's a file or if we're at the end of the list
					// then we can add in here
					if ((elemType==actionElemType && nameLI > file) || (actionElemType=="folder" && elemType=="file") || i==locNest.childNodes.length-1) {
						newLI = document.createElement("li");
						newLI.className = cssStyle;
						newLI.innerHTML = '<a '+hrefLink+' onMouseOver="top.ICEcoder.overFileFolder(\''+elemType+'\',\''+fullPath+location+'/'+file+'\')" onMouseOut="top.ICEcoder.overFileFolder(\''+elemType+'\',\'\')" style="position: relative; left:-22px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="'+location.replace(/\//g,"|")+'|'+file+'">'+file+'</a>';

						// Append or insert depending on which of the above if statements is true
						i==locNest.childNodes.length-1 ? locNest.appendChild(newLI,locNest.childNodes[i]) : locNest.insertBefore(newLI,locNest.childNodes[i]);

						// Escape from this loop now
						i=locNest.childNodes.length;
					}
				}
			}
		}

		// Renaming files
		if (action=="rename") {
			// Identify a shortened URL for our right clicked file and get our target element based on this
			shortURL = oldName;
			targetElem = document.getElementById('filesFrame').contentWindow.document.getElementById(shortURL.replace(/\//g,"|"));
			// Set the name to be as per our new file/folder name
			targetElem.innerHTML = file;
			// Finally, update the ID of the target & set a new mouseover function for the parent too
			targetElem.id = location.replace(/\//g,"|") + "|" + file;
			newMouseOver = targetElem.parentNode.onmouseover.toString().replace(shortURL.substring(shortURL.lastIndexOf("/")+1,shortURL.length),file).split('\'');
			eval("targetElem.parentNode.onmouseover = function() { top.ICEcoder.overFileFolder('"+newMouseOver[1]+"','"+newMouseOver[3]+"');}");
		}

		// Chmod on files
		if (action=="chmod") {
			// Identify a shortened URL for our file and get our target element based on this
			shortURL = top.ICEcoder.rightClickedFile.substr((top.ICEcoder.rightClickedFile.indexOf(shortURLStarts)+top.shortURLStarts.length),top.ICEcoder.rightClickedFile.length).replace(/\|/g,"/");
			targetElem = document.getElementById('filesFrame').contentWindow.document.getElementById(shortURL.replace(/\//g,"|")+"_perms");
			// Set the new perms
			targetElem.innerHTML = perms;
			}

		// Deleting files
		if (action=="delete") {
			// Simply get our target and make it dissapear
			targetElem = document.getElementById('filesFrame').contentWindow.document.getElementById(location.replace(/\//g,"|")+file);
			targetElem.parentNode.parentNode.style.display = "none";
		}
	}