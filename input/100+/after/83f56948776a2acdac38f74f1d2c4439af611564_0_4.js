function(e){
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
				$field = $(this).parent().children(':first');
				editModule(url, null, function(){ refreshField($field)});
			}
			return false;
		}