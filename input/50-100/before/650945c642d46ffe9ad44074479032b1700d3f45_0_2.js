function(e, flag, group){
				var $inputs = (group && group.length) ? group : $labels.find('input');
				$inputs.not(':disabled').attr('checked', (flag ? 'checked' : '')); 
				updateSelected();
			}