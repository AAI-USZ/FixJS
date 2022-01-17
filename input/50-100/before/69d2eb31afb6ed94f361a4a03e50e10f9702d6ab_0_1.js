function() {
		try {
			groups = JSON.parse(unescape(tomato_env.vars[groups_nvram_id])) || [];
		} catch(e) {

			console.log('failed to load groups');
			groups = [];
		}

		try {
			unassigned_rules = JSON.parse(unescape(tomato_env.vars[unassigned_rules_nvram_id])) || [];
		} catch(e) {
			console.log('failed to load unassigned rules');
			unassigned_rules = [];
		}
	}