function(data, doctype, docname) {
				// Start with a row and a cell in that row
				if(data[0] && data[0].fieldtype != "Section Break") {
					me.layout.addrow();
					if(data[0].fieldtype != "Column Break") {
						me.layout.addcell();
					}
				}
				
				$.extend(this, {
					generate_custom_html: function(field, doctype, docname) {
						var container = $a(me.layout.cur_cell, 'div');
						container.innerHTML = cur_frm.pformat[field.fieldname](locals[doctype][docname]);					
					},
					
					render_normal: function(field, data, i) {
						switch(field.fieldtype) {
							case 'Section Break':
								me.layout.addrow();
								
								// Add column if no column break after this field
								if(data[i+1] && data[i+1].fieldtype !=
										'Column Break') {
									me.layout.addcell();
								}
								break;
							
							case 'Column Break':
								me.layout.addcell(field.width, field.label);							
								break;
								
							case 'Table':
								var table = print_table(
										doctype, // dt
										docname, // dn
										field.fieldname,
										field.options, // tabletype 
										null, // cols
										null, // head_labels
										null, // widths
										null); // condition
								me.layout = _p.print_std_add_table(table, me.layout, me.pf_list, doctype, no_letterhead);
								break;
							
							case 'HTML':
								var div = $a(me.layout.cur_cell, 'div');
								div.innerHTML = field.options;
								break;
							
							case 'Code':
								var div = $a(me.layout.cur_cell, 'div');
								var val = _f.get_value(doctype, docname,
									field.fieldname);
								div.innerHTML = '<div>' + field.label +
									': </div><pre style="font-family: Courier, Fixed;">' + (val ? val : '') +
									'</pre>';
								break;
								
							case 'Text Editor':
								var div = $a(me.layout.cur_cell, 'div');
								var val = _f.get_value(doctype, docname,
									field.fieldname);
								div.innerHTML = val ? val : '';
								break;
								
							default:
								// Add Cell Data
								_p.print_std_add_field(doctype, docname, field, me.layout);
								break;
						}
					}				
				});
				
				// Then build each field
				for(var i = 0; i < data.length; i++) {
					var fieldname = data[i].fieldname ? data[i].fieldname :
						data[i].label;
					var field = fieldname ?
						get_field(doctype, fieldname, docname) : data[i];
					if(!field.print_hide) {
						if(cur_frm.pformat[field.fieldname]) {
							// If there is a custom method to generate the HTML, then use it
							this.generate_custom_html(field, doctype, docname);
						} else {
							// Do the normal rendering
							this.render_normal(field, data, i);
						}
					}					
				}
				me.layout.close_borders();
			}