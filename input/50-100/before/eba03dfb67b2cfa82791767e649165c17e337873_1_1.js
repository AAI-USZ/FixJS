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
			}