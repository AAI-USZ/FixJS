function() {
		//BUILD FISRT TABLET TREE WHEN BROWSER LOAD
		var treeData = [];
			if (TissueStack.dataSetStore.getSize() == 0) {
				treeData[0] = {title: "No Data Sets Found", tooltip: "No Data Sets Found"};
			} 
		this.addDataSetToTabletTree();
	}