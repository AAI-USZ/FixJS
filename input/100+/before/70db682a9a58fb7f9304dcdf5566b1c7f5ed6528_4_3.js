function() {
		var me = this;
		
		// the dialog
		var d = new wn.ui.Dialog({
			title:'New Account',
			fields: [
				{fieldtype:'Data', fieldname:'account_name', label:'New Account Name', reqd:true},
				{fieldtype:'Select', fieldname:'group_or_ledger', label:'Group or Ledger',
					options:'Group\nLedger'},
				{fieldtype:'Select', fieldname:'account_type', label:'Account Type',
					options: ['', 'Fixed Asset Account', 'Bank or Cash', 'Expense Account', 'Tax',
						'Income Account', 'Chargeable'].join('\n') },
				{fieldtype:'Float', fieldname:'tax_rate', label:'Tax Rate'},
				{fieldtype:'Select', fieldname:'master_type', label:'Master Type',
					options: ['NA', 'Supplier', 'Customer', 'Employee'].join('\n') },
				{fieldtype:'Button', fieldname:'create_new', label:'Create New' }
			]
		})

		var fd = d.fields_dict;
		
		// account type if ledger
		$(fd.group_or_ledger.input).change(function() {
			if($(this).val()=='Group') {
				$(fd.account_type.wrapper).toggle(false);
				$(fd.master_type.wrapper).toggle(false);
				$(fd.tax_rate.wrapper).toggle(false);
			} else {
				$(fd.account_type.wrapper).toggle(true);
				$(fd.master_type.wrapper).toggle(true);
				if(fd.account_type.get_value()=='Tax') {
					$(fd.tax_rate.wrapper).toggle(true);
				}
			}
		});
		
		// tax rate if tax
		$(fd.account_type.input).change(function() {
			if($(this).val()=='Tax') {
				$(fd.tax_rate.wrapper).toggle(true);				
			} else {
				$(fd.tax_rate.wrapper).toggle(false);				
			}
		})
		
		// create
		$(fd.create_new.input).click(function() {
			var btn = this;
			$(btn).set_working();
			var v = d.get_values();
			if(!v) return;
					
			var node = me.selected_node();
			v.parent_account = node.data('label');
			v.company = me.company;
			
		    $c_obj('GL Control', 'add_ac', v, 
				function(r,rt) { 
					$(btn).done_working();
					d.hide();
					node.trigger('reload'); 	
				});
		});
		
		// show
		d.onshow = function() {
			$(fd.group_or_ledger.input).change();
		}
		d.show();
	}