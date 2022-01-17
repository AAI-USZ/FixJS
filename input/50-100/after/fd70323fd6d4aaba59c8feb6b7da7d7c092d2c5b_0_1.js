function(node, nodeParent, newParent) {
		var me = this;
		console.log('dropped ' + node.id + ' to ' + newParent.id + ', p: ' + nodeParent.id);
		RPC.UserGui.MoveNavigationItem(node.id, node.ntype, null, newParent.id, function(ret, e) {
				if (!e.status)
				{
					Ext.MessageBox.alert("Error", e.message);
					me.refresh();
				}
			}
		);
	}