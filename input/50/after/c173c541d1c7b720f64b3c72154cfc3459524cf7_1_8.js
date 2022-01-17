function(res) {
						check(aState, res, isChar, 'build-string',
						      'procedure that returns a char', 2);
						return buildStringHelp(n+1, acc.push(res.val));
					}