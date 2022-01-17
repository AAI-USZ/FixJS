function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: Drought', '[of] '+source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		}