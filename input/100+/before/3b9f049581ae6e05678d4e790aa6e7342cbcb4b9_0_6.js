function calculate(data, target) {
		var main_attribute = parseFloat($('#' + target + ' .total .main_attribute').val());
		main_attribute += parseFloat(default_point['main_attribute']);
		
		var critical_chance = parseFloat($('#' + target + ' .total .critical_chance').val());
		critical_chance += parseFloat(data['skill']['critical_chance']);
		critical_chance += default_point['critical_chance'];
		
		var critical_damage = parseFloat($('#' + target + ' .total .critical_damage').val());
		critical_damage += parseFloat(data['skill']['critical_damage']);
		critical_damage += default_point['critical_damage'];
		
		var attack_speed = parseFloat($('#' + target + ' .total .attack_speed').val());
		var min_damage = parseFloat($('#' + target + ' .total .min_damage').val());
		var max_damage = parseFloat($('#' + target + ' .total .max_damage').val());
		
		// Display attribute
		$('#' + target + ' .attribute .main_attribute').val(main_attribute);
		$('#' + target + ' .attribute .critical_chance').val(critical_chance);
		$('#' + target + ' .attribute .critical_damage').val(critical_damage);
		
		// Weapon data
		var weapon_attack_per_second_1 = parseFloat(data['weapon_1']['weapon_attack_per_second_1']) | 0;
		var weapon_min_damage_1 = parseFloat(data['weapon_1']['weapon_min_damage_1']) | 0;
		var weapon_max_damage_1 = parseFloat(data['weapon_1']['weapon_max_damage_1']) | 0;
		
		var weapon_attack_per_second_2 = parseFloat(data['weapon_2']['weapon_attack_per_second_2']) | 0;
		var weapon_min_damage_2 = parseFloat(data['weapon_2']['weapon_min_damage_2']) | 0;
		var weapon_max_damage_2 = parseFloat(data['weapon_2']['weapon_max_damage_2']) | 0;

		var attack_per_second_1 = weapon_attack_per_second_1 * (attack_speed / 100 + 1);
		var attack_per_second_2 = weapon_attack_per_second_2 * (attack_speed / 100 + 1);

		if(attack_per_second_2 != 0)
			var average_aps = (attack_per_second_1 + attack_per_second_2) / 2;
		else
			var average_aps = attack_per_second_1;
		
		if(average_aps == 0)
			average_aps = 1;
		
		// Display Aps
		$('#' + target + ' .attribute .attack_per_second').val(parseInt(average_aps * 100) / 100);
		
		// Skill bonus damage
		var skill_damage = parseFloat(data['skill']['damage']);
		
		// Damage per second
		var dps = (weapon_min_damage_1 + weapon_max_damage_1 + weapon_min_damage_2 + weapon_max_damage_2) / 2;
		dps += (min_damage + max_damage) / 2;
		dps *= average_aps;
		dps *= main_attribute / 100 + 1;
		dps *= (critical_chance * critical_damage / 10000) + 1;
		dps *= skill_damage / 100 + 1;
		dps = parseInt(dps * 100) / 100;
	
		// Normal damage range
		var min_normal_damage = (weapon_min_damage_1 + weapon_min_damage_2) / 2;
		min_normal_damage += min_damage / 2;
		min_normal_damage *= main_attribute / 100 + 1;
		min_normal_damage *= skill_damage / 100 + 1;
		min_normal_damage = parseInt(min_normal_damage * 100) / 100;
		
		var max_normal_damage = (weapon_max_damage_1 + weapon_max_damage_2) / 2;
		max_normal_damage += max_damage / 2;
		max_normal_damage *= main_attribute / 100 + 1;
		max_normal_damage *= skill_damage / 100 + 1;
		max_normal_damage = parseInt(max_normal_damage * 100) / 100;
		
		// Critical damage range
		var min_critical_damage = (weapon_min_damage_1 + weapon_min_damage_2) / 2;
		min_critical_damage += min_damage / 2;
		min_critical_damage *= main_attribute / 100 + 1;
		min_critical_damage *= critical_damage / 100 + 1;
		min_critical_damage *= skill_damage / 100 + 1;
		min_critical_damage = parseInt(min_critical_damage * 100) / 100;
		
		var max_critical_damage = (weapon_max_damage_1 + weapon_max_damage_2) / 2;
		max_critical_damage += max_damage / 2;
		max_critical_damage *= main_attribute / 100 + 1;
		max_critical_damage *= critical_damage / 100 + 1;
		max_critical_damage *= skill_damage / 100 + 1;
		max_critical_damage = parseInt(max_critical_damage * 100) / 100;

		// Display attribute
		$('#' + target + ' .attribute .damage_per_second').val(dps);
		$('#' + target + ' .attribute .normal_damage_range').val(min_normal_damage + ' ~ ' + max_normal_damage);
		$('#' + target + ' .attribute .critical_damage_range').val(min_critical_damage + ' ~ ' + max_critical_damage);
	}