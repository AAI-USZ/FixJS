function () {
		this.callParent(arguments);
		
		var store = PartKeepr.getApplication().getFootprintStore();
		var nodeData, record;
		
		Ext.data.NodeInterface.decorate("PartKeepr.Footprint");
		
		for (var i=0;i<store.getCount();i++) {
			record = store.getAt(i);
			nodeData = {
					text: record.getRecordName(),
					id: record.get("id"),
					leaf: true,
					iconCls:'icon-footprint'
			};
			
			console.log(record.getRecordName());
			var newNode = Ext.create("PartKeepr.Footprint", nodeData);
			
			if (record.get("category") === 0) {
				this.getRootNode().firstChild.appendChild(newNode);
			} else {
				
				var node = this.getRootNode().findChildBy(function () {
					if (this.self.getName() == "PartKeepr.FootprintCategory" && this.get("id") == record.get("category")) {
						return true;
					} else {
						return false;
					}
				}, false, true);
				
				if (node) {
					node.appendChild(newNode);
				} else {
					this.getRootNode().firstChild.appendChild(newNode);
				}
			}
			
		}
		
	}