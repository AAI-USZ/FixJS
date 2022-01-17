function(rule) {
		var rule_form_template = $('#rule_form_template').html(),
			data;
	  
		if(rule) {  		
			data = {'rule': $.extend({}, rule)}
			
			// Toggle day checkboxes
			$.each(rule.days, function(){
				data.rule[this] = true;
			});	

		} else {
			data = {'rule': {}};
		}

		var start_hour, end_hour, start_min, end_min;

		if(!rule || rule.start_mins === -1 || rule.end_mins === -1) {
			start_hour = -1;
			end_hour = -1;
			start_min = -1;
			end_min = -1;
		} else {
			start_hour = Math.floor(rule.start_mins / 60);
			end_hour = Math.floor(rule.end_mins / 60);
			start_min = rule.start_mins % 60;
			end_min = rule.end_mins % 60;
		}

		data.rule.start_hours = []
		data.rule.end_hours = []
		for(var i=00; i<24; i++) {
			var is_start_hour_selected = (i === start_hour ? true : false);
			var is_end_hour_selected = (i === end_hour ? true : false);
			data.rule.start_hours.push({'value':i, 'selected':is_start_hour_selected});
			data.rule.end_hours.push({'value':i, 'selected':is_end_hour_selected});
		}
		
		data.rule.start_mins = []
		data.rule.end_mins = []
		for(var mi=00; mi<60; mi+=5) {
			var is_start_min_selected = (mi === start_min ? true : false);
			var is_end_min_selected = (mi === end_min ? true : false);
			data.rule.start_mins.push({'value':mi, 'selected':is_start_min_selected});
			data.rule.end_mins.push({'value':mi, 'selected':is_end_min_selected});
		}

		var $target = $('#ruleformbox'),
			$form = $target.html(Mustache.render(rule_form_template, data)).children('form');

		$form.find('.save_rule').bind('click', function() {
			var result = {}

			result.name = $.trim($form.find('.rule_name').val());

			// Sum of all days even if every_day is checked.
			//if($form.find('.check[name="every_day"]').attr('checked')) {
			//	result.days = -1;
			//} else {
				result.days = [];
				$form.find('.day:checked').each(function(i, d) {
					result.days.push($(d).attr('name'));
				});
			//}

			if($form.find('.check[name="all_day"]').attr('checked')) {
				result.start_mins = -1;
				result.end_mins = -1;
			} else {
				result.start_mins = Number($form.find('.hourcombo[name="start_time_hour"]').val()) * 60 + Number($form.find('.mincombo[name="start_time_min"]').val());
				result.end_mins = Number($form.find('.hourcombo[name="end_time_hour"]').val()) * 60 + Number($form.find('.mincombo[name="end_time_min"]').val());	
			}

			result.block_all = !!$form.find('.check[name="block_all"]').attr('checked');
			result.block_social = !!$form.find('.check[name="block_social"]').attr('checked');
			result.block_stream = !!$form.find('.check[name="block_stream"]').attr('checked');

			result.block_sites = $form.find('textarea[name="block_sites"]').val().split(/\s+/);

			if(rule) {
				$.extend(rule, result);
			} else {
				result.enabled = true;
				rules.push(result);
			}	
			// including rules in groups variable
			var group_id = getParamByName('g');
			if (group_id != null) {
				groups[group_id].rules = rules;
				tomato_env.set(groups_nvram_id, escape(JSON.stringify(groups)));
			} else {
				tomato_env.set(unassigned_rules_nvram_id, escape(JSON.stringify(rules)));
			}			
			set_rules();
			tomato_env.apply();
			$.fancybox.close();
			render_rules_list();
			calendar.fullCalendar('refetchEvents')
		});

		$.fancybox.open($target, {'minHeight':340, 'minWidth':600});
	}