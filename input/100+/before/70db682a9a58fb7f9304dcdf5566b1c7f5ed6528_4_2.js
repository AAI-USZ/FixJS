function() {
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
		}