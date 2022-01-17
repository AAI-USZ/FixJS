function(){
							webshims.onNodeNamesPropertyModify(['input', 'textarea', 'select'], ['disabled', 'readonly'], {
								set: function(){
									var elem = this;
									if(!elem.disabled){
										$(elem).val( $(elem).val() );
									}
								}
							});
						}