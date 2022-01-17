function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: Snow Warning', '[of] '+source);
			} else {
				this.add('-weather', 'Hail');
			}
		}