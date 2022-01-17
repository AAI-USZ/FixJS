function(node, nodeParent, newParent) {
		console.log('dropped ' + node.id + ' to ' + newParent.id + ', p: ' + nodeParent.id);
		RPC.UserGui.MoveNavigationItem(node.id, node.ntype, null, newParent.id, {
			success: function(ret, e) {
				if (e.status)
				{
				}
				else
				{
					Ext.MessageBox.alert("Error", e.message);
					me.refresh();
				}
			}
		});
	}