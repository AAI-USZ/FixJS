function(){
								//Ext.getCmp('btnAddContact').actions.hide();
								Ext.Viewport.items.get('AddContactActionSheet').hide();

								this.mixins.mixHome.changeView('EditPrimaryContactVW');

							}