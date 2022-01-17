function(i, e) {
				var $this = $(this),
					rule = rules[i];

				$this.find('.check[name="rule_toggle"]').bind('change', function() {
					rule.enabled = !rule.enabled;
					calendar.fullCalendar('refetchEvents');	
				});
				
				$this.find('.edit_rule_trig').click(function() {
					render_rule_form(rule);
				});
				$this.find('.delete_rule_trig').click(function() {
					rules.splice(i,1);
					render_rules_list();
					var group_id = getParamByName('g');
					if (group_id != null) {
						groups[group_id].rules = rules;
						tomato_env.set(groups_nvram_id, escape(JSON.stringify(groups)));
					} else {
						tomato_env.set(unassigned_rules_nvram_id, escape(JSON.stringify(rules)));
					}	
					set_rules();
					tomato_env.apply();
					//$('#apply_trigger').fadeIn();
			});
		}