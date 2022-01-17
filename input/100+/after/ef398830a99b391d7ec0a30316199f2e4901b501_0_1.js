function(flag, node) {
		    	   // if parent is selected, also select direct children. no deeper recursion needed so far.
		    	   if (node.data.isFolder && node.childList) {
		    		   for (var x=0;x<node.childList.length;x++) {
		    			   node.childList[x].select(flag);
		    		   }
		    	   } else if (node.data.isBaseLayer) {
		    		   // likewise if a base layer was selected/deselected, that results in the parent data set not being de/selected
		    		   node.parent.select(flag);
		    		   return;
		    	   }

		    	   // now as for the action we need to take, evaluate whether we have a check/uncheck of a data set
		    	   // but before receive key from node 
		    	   var key = node.data.isFolder ? node.data.key : node.data.key.substring(0, node.data.key.length - "_base_layer".length);
		    	   if (!flag) {
		    		   // remove dataset in question
		    		   _this.removeFromSelectedDataSetsByKey(key);
		    	   }

	    		   var selectedNodes = this.getSelectedNodes(true);
	    		   // brief check
	    		   if (selectedNodes.length > 2) {
	    			   // we cannot display more than 2 data sets ... let the user know
	    			   alert("Please deselect a data set before you select a different one");
	    			   
	    			   node._select(false, false, true);
	    			   if (node.data.isFolder && node.childList) {
			    		   for (var x=0;x<node.childList.length;x++) {
			    			   node.childList[x]._select(false, false, true);
			    		   }
			    	   } else if (node.data.isBaseLayer) {
			    		   // likewise if a base layer was selected/deselected, that results in the parent data set not being de/selected
			    		   node.parent._select(false);
			    	   }	    			   
	    			   return;
	    		   }

	    		   if (selectedNodes.length == 0) {
	    			   TissueStack.Utils.adjustScreenContentToActualScreenSize(0);
	    			   return;
	    		   }


	    		   // display/hide data sets left / not left
	    		   for (var n=0;n<selectedNodes.length;n++) {
		    		   _this.addToOrReplaceSelectedDataSets(selectedNodes[n].data.key, n);
	    		   }

	    			// show everything again
	    		   for (var n=0;n<selectedNodes.length;n++) {
		    			_this.showDataSet(n + 1);
	    		   }

	    			// re-initialize data set handed in
	    			TissueStack.InitUserInterface();
	    			TissueStack.BindDataSetDependentEvents();
		       }