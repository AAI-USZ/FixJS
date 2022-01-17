function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: Sand Stream', '[of] '+source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		}