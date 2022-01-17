function(e, data) {
							self.updateFromEditForm();
							self.css('visibility', 'visible');
							// Add ajax settings after init period to avoid unnecessary initial ajax load
							// of existing tree in DOM - see load_node_html()
							data.inst._set_settings({'html_data': {'ajax': {
								'url': self.data('urlTree'),
								'data': function(node) {
									var params = self.data('searchparams') || [];
									// Avoid duplication of parameters
									params = $.grep(params, function(n, i) {return (n.name != 'ID' && n.name != 'value');});
									params.push({name: 'ID', value: $(node).data("id") ? $(node).data("id") : 0});
									params.push({name: 'ajax', value: 1});
									return params;
								}
							}}});
							
							// Only show checkboxes with .multiple class
							data.inst.hide_checkboxes();
						}