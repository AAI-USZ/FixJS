function(e, data){
			treecontainer.treewrapper("renameNode", data.nid, data.title);
			_getDataAndCreateTplView(data.nid);
			edit.tpledit("removeTplEdit");
		}