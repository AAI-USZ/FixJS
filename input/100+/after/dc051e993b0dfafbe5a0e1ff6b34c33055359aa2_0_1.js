function(closeTabNum) {
		var cM, okToRemove;

		cM = ICEcoder.getcMInstance();
		okToRemove = true;
		if (ICEcoder.changedContent[closeTabNum-1]==1) {
			okToRemove = top.ICEcoder.ask('You have made changes.\n\nAre you sure you want to close without saving?');
		}

		if (okToRemove) {
			// recursively copy over all tabs & data from the tab to the right, if there is one
			for (var i=closeTabNum;i<ICEcoder.openFiles.length;i++) {
				top.document.getElementById('tab'+i).innerHTML = top.document.getElementById('tab'+(i+1)).innerHTML;
				ICEcoder.openFiles[i-1] = ICEcoder.openFiles[i];

				// reduce the tab reference number on the closeTab link by 1
				top.document.getElementById('tab'+i).innerHTML = top.document.getElementById('tab'+i).innerHTML.replace(("closeTab("+(i+1)+")"),"closeTab("+i+")").replace(("closeTabButton("+(i+1)+")"),"closeTabButton("+i+")");
			}
			// hide the instance we're closing by setting the hide class and removing from the array
			ICEcoder.content.contentWindow['cM'+top.ICEcoder.cMInstances[closeTabNum-1]].getWrapperElement().style.display = "none";
			top.ICEcoder.cMInstances.splice(closeTabNum-1,1);
			// clear the rightmost tab (or only one left in a 1 tab scenario) & remove from the array
			top.document.getElementById('tab'+ICEcoder.openFiles.length).style.display = "none";
			top.document.getElementById('tab'+ICEcoder.openFiles.length).innerHTML = "";
			ICEcoder.openFiles.pop();
			ICEcoder.openFileMDTs.pop();
			// If we're closing the selected tab, determin the new selectedTab number, reduced by 1 if we have some tabs, 0 for a reset state
			if (ICEcoder.selectedTab==closeTabNum) {
				ICEcoder.openFiles.length>0 ? ICEcoder.selectedTab-=1 : ICEcoder.selectedTab = 0;
			}
			if (ICEcoder.openFiles.length>0 && ICEcoder.selectedTab==0) {ICEcoder.selectedTab=1};

			// hide the content area if we have no tabs open
			if (ICEcoder.openFiles.length==0) {
				top.ICEcoder.fMIconVis('fMView',0.3);
			} else {
				// Switch the mode & the tab
				ICEcoder.switchMode();
				ICEcoder.switchTab(ICEcoder.selectedTab);
			}
			// Highlight the selected tab after splicing the change state out of the array
			top.ICEcoder.changedContent.splice(closeTabNum-1,1);
			top.parent.ICEcoder.redoTabHighlight(ICEcoder.selectedTab);

			top.ICEcoder.setPreviousFiles();
		}
		// Lastly, stop it from trying to also switch tab
		top.ICEcoder.canSwitchTabs=false;
	}