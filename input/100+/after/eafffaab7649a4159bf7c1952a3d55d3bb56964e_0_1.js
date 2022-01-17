function(match, mnr){
				var pos = value.indexOf(match),
					msplit = [value.substr(0, pos), value.substr(pos, match.length), value.substr(pos+match.length)];

				msplit.each(function(matchsplit, snr){
					if(msplit.length-1 == snr){
						value = matchsplit;

						if(matches.length-1 == mnr)
							mtches.append([value]);

						return;
					}
					mtches.append([value == matchsplit ? match : matchsplit]);
				});
			}