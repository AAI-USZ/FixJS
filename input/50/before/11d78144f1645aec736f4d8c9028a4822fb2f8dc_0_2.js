function() {
				// Could not resolve in a reasonable time, warn of possible deadlocked
				// circular ref
				return when.reject('Possible circular ref:\n' + inflightRefs.join('\n'));
			}