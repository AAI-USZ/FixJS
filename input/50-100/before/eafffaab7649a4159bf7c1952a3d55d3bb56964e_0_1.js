function(matchsplit, snr){
					if(msplit.length-1 == snr)
						value = matchsplit;
					mtches.append([value == matchsplit ? match : matchsplit]);

					if(matches.length*2 == mtches.length)
						mtches.append([value]);
				}