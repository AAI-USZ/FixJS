function(){
		var me = this;
		// the dialog
		var d = new wn.ui.Dialog({
			title:'New Cost Center',
			fields: [
				{fieldtype:'Data', fieldname:'cost_center_name', label:'New Cost Center Name', reqd:true},
				{fieldtype:'Select', fieldname:'group_or_ledger', label:'Group or Ledger',
					options:'Group\nLedger', description:'Further accounts can be made under Groups,\
					 	but entries can be made against Ledger'},
				{fieldtype:'Button', fieldname:'create_new', label:'Create New' }
			]
		});
	
		// create
		$(d.fields_dict.create_new.input).click(function() {
			var btn = this;
			$(btn).set_working();
			var v = d.get_values();
			if(!v) return;
			
			var node = me.selected_node();
			
			v.parent_cost_center = node.data('label');
			v.company_name = me.company;
			
		    $c_obj('GL Control', 'add_cc', v, 
				function(r,rt) { 
					$(btn).done_working();
					d.hide();
					node.trigger('reload'); 	
				});
		});
		d.show();
	}