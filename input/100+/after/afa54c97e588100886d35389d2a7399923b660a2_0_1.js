function() {
		log.debug('clicked duplicateRecord', this.logAuthor);
		var grid = this.grid;
		var item = grid.getSelectionModel().getSelection()[0];
		if (item) {
			var editing = false;
			
			if (this.formXtype) {
				if (this.EditMethod == 'tab') {
					var main_tabs = Ext.getCmp('main-tabs');
					var id = this.formXtype + '-' + item.internalId.replace(/[\. ]/g, '-') + '-tab';
					var tab = Ext.getCmp(id);
					if (tab) {
						log.debug("Tab '" + id + "'allerady open, just show it", this.logAuthor);
						main_tabs.setActiveTab(tab);
					}else {
						log.debug("Create tab '" + id + "'", this.logAuthor);
						var form = main_tabs.add({
							title: _('Edit') + ' ' + item.raw.crecord_name,
							xtype: this.formXtype,
							id: id,
							closable: true }).show();
					}

				}else {
					var form = Ext.getCmp(id);

					if (form) {
						log.debug("Window '" + id + "' allready open, just show it", this.logAuthor);
						form.win.show();
					}else {
						// Create new Window
						log.debug("Create window '" + this.formXtype + "'", this.logAuthor);
						var form = Ext.create('widget.' + this.formXtype, {
							id: id,
							EditMethod: this.EditMethod,
							editing: editing,
							record: data
						});

						var win = Ext.create('widget.window', {
							title: this.modelId,
							items: form,
							closable: true,
							constrain: true,
							renderTo: this.grid.id,
							closeAction: 'destroy'
						}).show();
						form.win = win;
						this._keynav.disable();
					}
				}

				//duplicate
				var copy = item.copy();
				copy.set('_id', undefined);

				// load records
				if (this.beforeload_DuplicateForm) {
					this.beforeload_DuplicateForm(form, copy);
				}

				form.loadRecord(copy);

				if (this.afterload_DuplicateForm) {
					this.afterload_DuplicateForm(form, copy);
				}

				this._bindFormEvents(form);
			}
		}else{
			global.notify.notify(_('Error'), _('You must select record'), 'error');
		}
	}