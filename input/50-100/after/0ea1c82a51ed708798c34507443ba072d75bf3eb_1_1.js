function(pokemon) {
			var target = pokemon.side.foe.randomActive();
			if (!target) return;
			var ability = this.getAbility(target.ability);
			if (ability.id === 'forecast' || ability.id === 'multitype' || ability.id === 'trace') return;
			if (pokemon.setAbility(ability)) {
				this.add('-ability',pokemon, ability,'[from] ability: Trace','[of] '+target);
			}
		}