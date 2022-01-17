function(node) {
					return commands[command].inlineCommandActivatedValues
						.indexOf(getEffectiveCommandValue(node, command)) != -1;
				}