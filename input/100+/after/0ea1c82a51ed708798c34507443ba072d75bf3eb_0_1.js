function(pokemon) {
			var target = pokemon.side.foe.randomActive();
			if (!target) return;
			var ability = this.getAbility(target.ability);
			if (ability.id === 'flowergift' || ability.id === 'forecast' || ability.id === 'illusion' || ability.id === 'imposter' || ability.id === 'multitype' || ability.id === 'trace' || ability.id === 'wonderguard' || ability.id === 'zenmode') return;
			if (pokemon.setAbility(ability)) {
				this.add('-ability',pokemon, ability,'[from] ability: Trace','[of] '+target);
			}
		}