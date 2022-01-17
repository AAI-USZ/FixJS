function () {
				var npaths = paths.filter(function (path) {
					return (path !== 'one') && (path.indexOf(sep + 'one') === -1);
				}).sort();
				var invoked = mergeInvoked();
				a.deep(invoked && invoked.old && invoked.old.sort(), diff.call(paths, npaths).sort(),
					"Ignored: old");
				a.deep(invoked.new, [], "Ignored: new");
				reader(function (data) {
					a.deep(data, npaths, "Ignored: data");
				});
				return deferred(rmdir(gitPath), unlink(ignoreFile));
			}