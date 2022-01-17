function(node) {
					return $_( commands[command].inlineCommandActivatedValues )
						.indexOf(getEffectiveCommandValue(node, command)) != -1;
				}