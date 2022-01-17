function() {
				this.logAuthor = '[' + this.id + ']';
				log.debug('init sub object', this.logAuthor);
				//------------------create operator combo----------------
				this.operator_combo = Ext.widget('combobox', {
								queryMode: 'local',
								displayField: 'text',
								//Hack: don't search in store
								minChars: 50,
								//allowBlank : false,
								valueField: 'operator',
								emptyText: _('Type value or choose operator'),
								store: this.operator_store
							});


				//-------------sub operator combo ($in etc...)-----
				this.sub_operator_combo = Ext.widget('combobox', {
								queryMode: 'local',
								displayField: 'text',
								valueField: 'operator',
								value: '$eq',
								editable: false,
								margin: '0 0 0 5',
								store: this.sub_operator_store
							});

				//--------------------panel-------------------------
				this.add_button = Ext.widget('button', {
					iconCls: 'icon-add',
					margin: '0 0 0 5',
					hidden: true,
					tooltip: _('Add new field/condition')
				});

				if (this.opt_remove_button)
					this.remove_button = Ext.widget('button', {
						iconCls: 'icon-cancel',
						margin: '0 5 0 0',
						tooltip: _('Remove this condition')
					});

				this.string_value = Ext.widget('textfield', {
					margin: '0 0 0 5',
					//allowBlank : false,
					emptyText: 'Type value here'
					});
				this.array_field = Ext.create('cfilter.array_field', {hidden: true});

				var items_array = [];
				if (this.opt_remove_button)
					items_array.push(this.remove_button);
				items_array.push(this.operator_combo, this.sub_operator_combo, this.string_value, this.array_field, this.add_button);

				//upper panel
				var config = {
					items: items_array,
					layout: 'hbox',
					border: false
				};

				this.upperPanel = Ext.widget('panel', config);

				//bottom panel
				var config = {
					margin: '0 0 0 20',
					bodyStyle: 'border-top:none;border-bottom:none;border-right:none;'
				};
				this.bottomPanel = Ext.widget('panel', config);

				//----------------------bind events-------------------
				//combo binding
				this.operator_combo.on('change', function(combo,value,oldvalue) {
					this.operator_combo_change(combo, value, oldvalue);
				},this);

				this.sub_operator_combo.on('change', function(combo,value,oldvalue) {
					this.sub_operator_combo_change(combo, value, oldvalue);
				},this);

				//button binding
				this.add_button.on('click', function() {this.add_cfilter()},this);

				if (this.opt_remove_button)
					this.remove_button.on('click', this.remove_button_func, this);
				//-------------------building cfilter-----------------
				this.items = [this.upperPanel, this.bottomPanel];
				this.callParent(arguments);

				//--------------load filter if there is filter--------
				if (this.filter)
					this.setValue(this.filter);
			}