function (response) {
				var o = Ext.decode(response.responseText);
				if (o.success == true) {
					var sm = this.getSelectionModel ();
					var node;

					this.suspendEvents (false);
					this.setRootNode (o.data);
					this.getRootNode ().raw = o.data;
					this.resumeEvents ();
					this.doLayout();

					if (Earsip.berkas.tree.pid != 0) {
						node = this.getRootNode ().findChild ('id', Earsip.berkas.tree.id, true);
					} else {
						node = this.getRootNode ();
					}

					sm.deselectAll ();
					this.expandAll ();
					if (node != null) sm.select (node);
				} else {
					Ext.msg.error (o.info);
				}
			}