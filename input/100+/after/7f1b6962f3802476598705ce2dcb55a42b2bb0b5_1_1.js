function() {

		//----------------------Build wizard options
		var step1 = {
				title: _('Choose widget'),
				//description : _('choose the type of widget you want, its title, and refresh interval'),
				items: [
				{
					xtype: 'combo',
					store: 'Widgets',
					forceSelection: true,
					fieldLabel: _('Type'),
					name: 'xtype',
					displayField: 'name',
					valueField: 'xtype',
					//value: 'empty',
					allowBlank: false
				},{
					xtype: "checkbox",
					fieldLabel: _("Auto title") + " " + _("if available"),
					checked: true,
					inputValue: true,
					uncheckedValue: false,
					name: "autoTitle"
				},{
					xtype: 'textfield',
					fieldLabel: _('Title') + ' ('+ _('optional') + ')',
					name: 'title'
				},{
					xtype: 'checkbox',
					fieldLabel: _('Show border'),
					checked: false,
					name: 'border'
				},{
					xtype: 'numberfield',
					fieldLabel: _('Refresh interval'),
					name: 'refreshInterval',
					value: 0,
					minValue: 0
				}]
		};

		this.step_list = [step1];

		this.callParent(arguments);

	}