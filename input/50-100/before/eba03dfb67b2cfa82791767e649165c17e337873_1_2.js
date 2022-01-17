function() {
		// group_id? = false when group_id = 0
		// New condition separates correctly unassigned rules from group rules
		var group_id_param = getParamByName('g'),
			group_id = Number(group_id_param);
		if(group_id_param != null && typeof group_id != 'undefined') {
			rules = groups[group_id].rules || [];
			group_name = groups[group_id].name;
		} else {
			rules = unassigned_rules;
			group_name = unassigned_rules; // Still Weird
			unassigned = true;
		}
		
	    render_rules_list();
	    calendar.fullCalendar('refetchEvents');	
	}