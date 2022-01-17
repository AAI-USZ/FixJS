function(){
								Ext.Viewport.items.get('AddContactActionSheet').hide();
								sContact=Ext.getCmp('EditSecondaryContactVW');
								sContact.setRecord(null);

								this.changeView('EditSecondaryContactVW');

							}