function(data) {
							var dirs = filter(data.tree);
							updateTree(dirs);
							updateArrows(dirs, loaded);
							cwd == fm.cwd().hash && sync();
						}