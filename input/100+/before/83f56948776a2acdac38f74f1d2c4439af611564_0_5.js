function(i){
		var $field = $(this);
		var fieldId = $field.attr('id');
		var $form = $field.closest('form');
		var className = ($field.attr('class') != undefined) ? $field.attr('class').split(' ') : [];
		var module = '';
		
		var isMulti = ($field.attr('multiple')) ? true : false;
		
		if (className.length > 1){
			module = className[className.length -1];
		} else {
			module = fieldId.substr(0, fieldId.length - 3) + 's'; // eg id = client_id so module would be clients
		}
		var parentModule = fuel.getModuleURI(context);
		
		var url = jqx.config.fuelPath + '/' + module + '/inline_';
		
		if (!$field.parent().find('.add_inline_button').length) $field.after('&nbsp;<a href="' + url + 'create" class="btn_field add_inline_button">' + fuel.lang('btn_add') + '</a>');
		if (!$field.parent().find('.edit_inline_button').length) $field.after('&nbsp;<a href="' + url + 'edit/" class="btn_field edit_inline_button">' + fuel.lang('btn_edit') + '</a>');
		
		var refreshField = function(){

			// if no value added,then no need to refresh
			if (!selected) return;
			var refreshUrl = jqx.config.fuelPath + '/' + parentModule + '/refresh_field';
			var params = { field:fieldId, field_id: fieldId, values: $field.val(), selected:selected};
							
			// fix for pages... a bit kludgy
			if (module == 'pages'){
				params['layout'] = $('#layout').val();
			}

			$.post(refreshUrl, params, function(html){
				$('#notification').html('<ul class="success ico_success"><li>Successfully added to module ' + module + '</li></ul>')
				fuel.notifications();
				$modal.jqmHide();
				$('#' + fieldId, context).replaceWith(html);
				
				// already inited with custom fields
				
				//console.log($form.formBuilder())
				//$form.formBuilder().call('inline_edit');
				// refresh field with formBuilder jquery
				
				fuel.fields.multi_field(context)
				
				$('#' + fieldId, context).change(function(){
					changeField($(this));
				});
				changeField($('#' + fieldId, context));
			});
		}
		
		var changeField = function($this){
			if (($this.val() == '' || $this.attr('xmultiple')) || $this.find('option').length == 0){
				if ($this.is('select') && $this.find('option').length == 0){
					$this.hide();
				}
				if ($this.is('input, select')) $this.next('.btn_field').hide();
			} else {
				$this.next('.btn_field').show();
			}	
		}
		
		$('.add_inline_button', context).unbind().click(function(e){
			editModule($(this).attr('href'), null, refreshField);
			$(context).scrollTo('body', 800);
			return false;
		});

		$('.edit_inline_button', context).unbind().click(function(e){
			var $elem = $(this).parent().find('select');
			var val = $elem.val();
			if (!val){
				alert(fuel.lang('edit_multi_select_warning'));
				return false;
			}
			var editIds = val.toString().split(',');
			var $selected = $elem.parent().find('.supercomboselect_right li.selected:first');
			
			if ((!editIds.length || editIds.length > 1) && (!$selected.length || $selected.length > 1)) {
				alert(fuel.lang('edit_multi_select_warning'));
			} else {
				if ($selected.get(0) && $selected.length == 1){
					var id = $selected.attr('id');
					var idIndex = id.substr(id.lastIndexOf('_') + 1);
					var val = $elem.find('option').eq(idIndex).attr('value');
					var url = $(this).attr('href') + val;
				} else {
					var url = $(this).attr('href') + editIds[0];
				}
				editModule(url, null, refreshField);
			}
			return false;
		});

		$field.change(function(){
			changeField($(this));
		});
		changeField($field);
	}