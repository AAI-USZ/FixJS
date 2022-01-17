function() {
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
			}