function(t) {
					var _source= t.route(),
						origin = targetSpace,
						currUser = stat.username,
						tags = t.tags.filter(function(tag) {
							return /^@/.test(tag) &&
								tag.slice(1) !== currUser;
						});

					if (!~tags.indexOf(t.modifier) && t.modifier !== currUser) {
						tags.push('@' + t.modifier);
					}

					if (!~tags.indexOf(t.creator) && t.creator !== currUser) {
						tags.push('@' + t.creator);
					}

					if (!~tags.indexOf(origin)) {
						tags.push('@' + origin);
					}

					callback({
						title: title,
						text: text,
						_source: _source,
						space: space,
						tags: tags,
						origin: origin
					}, url);
				}