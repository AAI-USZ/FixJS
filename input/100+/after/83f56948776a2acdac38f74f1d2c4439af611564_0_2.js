function(html){
				$('#notification').html('<ul class="success ico_success"><li>Successfully added to module ' + module + '</li></ul>')
				fuel.notifications();
				$modal.jqmHide();
				if (html.length){
					$('#' + fieldId, context).replaceWith(html);
				}
				
				// already inited with custom fields
				
				//console.log($form.formBuilder())
				//$form.formBuilder().call('inline_edit');
				// refresh field with formBuilder jquery
				
				fuel.fields.multi_field(context)
				$('#form').formBuilder().initialize($('#' + fieldId, context));
				$('#' + fieldId, context).change(function(){
					changeField($(this));
				});
				changeField($('#' + fieldId, context));
			}