function(){
							webshims.onNodeNamesPropertyModify(['input', 'textarea'], ['disabled', 'readonly'], {
								set: function(val){
									var elem = this;
									if(!val && elem){
										$.prop(elem, 'value', $.prop(elem, 'value'));
									}
								}
							});
							webshims.onNodeNamesPropertyModify(['select'], ['disabled', 'readonly'], {
								set: function(val){
									var elem = this;
									if(!val && elem){
										val = $(elem).val();
										($('option:last-child', elem)[0] || {}).selected = true;
										$(elem).val( val );
									}
								}
							});
						}