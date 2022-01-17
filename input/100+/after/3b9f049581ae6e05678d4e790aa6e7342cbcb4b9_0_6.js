function calculateMinorDPS(target) {
		$.each($('#equip .' + target + ' > div'), function() {
			var key = $(this).attr('class');
			if(key != 'weapon_1' && key != 'weapon_2') {
				var total = {
					main_attribute: parseFloat($('#' + target + ' .attribute .main_attribute').val()),
					critical_chance: parseFloat($('#' + target + ' .attribute .critical_chance').val()),
					critical_damage: parseFloat($('#' + target + ' .attribute .critical_damage').val()),
					attack_speed: parseFloat($('#' + target + ' .total .attack_speed').val()),
					min_damage: parseFloat($('#' + target + ' .total .min_damage').val()),
					max_damage: parseFloat($('#' + target + ' .total .max_damage').val())
				};
				
				$.each($('#equip .' + target + ' .' + key + ' input'), function() {
					total[$(this).attr('class')] -= parseFloat($(this).val());
					
				});
				
				var weapon_attack_per_second_1 = parseFloat($('#equip .' + target + ' .weapon_attack_per_second_1').val());
				var weapon_min_damage_1 = parseFloat($('#equip .' + target + ' .weapon_min_damage_1').val());;
				var weapon_max_damage_1 = parseFloat($('#equip .' + target + ' .weapon_max_damage_1').val());;
				
				var weapon_attack_per_second_2 = parseFloat($('#equip .' + target + ' .weapon_attack_per_second_2').val());;
				var weapon_min_damage_2 = parseFloat($('#equip .' + target + ' .weapon_min_damage_2').val());;
				var weapon_max_damage_2 = parseFloat($('#equip .' + target + ' .weapon_max_damage_2').val());;
				
				var main_attribute = total['main_attribute'];
				var critical_chance = total['critical_chance'];
				var critical_damage = total['critical_damage'];
				var attack_speed = total['attack_speed'];
				var min_damage = total['min_damage'];
				var max_damage = total['max_damage'];
				
				var attack_per_second_1 = weapon_attack_per_second_1 * (attack_speed / 100 + 1);
				var attack_per_second_2 = weapon_attack_per_second_2 * (attack_speed / 100 + 1);
		
				if(attack_per_second_2 != 0)
					var average_aps = (attack_per_second_1 + attack_per_second_2) / 2;
				else
					var average_aps = attack_per_second_1;
				
				if(average_aps == 0)
					average_aps = 1;
				
				// Skill bonus damage
				var skill_damage = parseFloat($('#' + target + ' .skill .damage').val());
				var dps = parseFloat($('#' + target + ' .attribute .damage_per_second').val());
				
				// Damage per second
				var minor_dps = (weapon_min_damage_1 + weapon_max_damage_1 + weapon_min_damage_2 + weapon_max_damage_2) / 2;
				minor_dps += (min_damage + max_damage) / 2;
				minor_dps *= average_aps;
				minor_dps *= main_attribute / 100 + 1;
				minor_dps *= (critical_chance * critical_damage / 10000) + 1;
				minor_dps *= skill_damage / 100 + 1;
				minor_dps = dps - minor_dps;
				minor_dps = parseInt(minor_dps, 10);

				$('#equip .' + target + ' .' + key + ' .minor_dps').text(minor_dps + ' DPS');
			}
		});
	}