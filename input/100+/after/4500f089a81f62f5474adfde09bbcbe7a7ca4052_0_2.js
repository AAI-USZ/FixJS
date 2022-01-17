function() {
		var window = this.getGroupsWindow(),
			checkedNodes = this.getGroupsTree().getView().getChecked(),
			nodes = [];
		window.setLoading({msg: SmartWFM.lib.I18n.get('swfm', 'Loading ...')});
		Ext.Array.each(checkedNodes, function(item) {
			nodes.push(item.getData().id);
		});
		console.warn(nodes);

		SmartWFM.lib.RPC.request({
			action: 'groups.members.delete',
			params: nodes,
			successCallback: function() { // called on success
				this.close();
			},
			successScope: window,
			errorCallback: function() {	// called on error
				this.setLoading(false);
			},
			errorScope: window
		});
	}