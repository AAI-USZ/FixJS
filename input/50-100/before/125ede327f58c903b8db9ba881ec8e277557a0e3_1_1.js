function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: Drizzle', '[of] '+source);
			} else {
				this.add('-weather', 'RainDance');
			}
		}