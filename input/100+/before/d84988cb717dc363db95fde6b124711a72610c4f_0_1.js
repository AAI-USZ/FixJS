function() {
				var cwd     = fm.cwd().hash,
					current = tree.find('#'+fm.navHash2Id(cwd)), 
					rootNode;
				
				if (openRoot) {
					rootNode = tree.find('#'+fm.navHash2Id(fm.root()));
					rootNode.is('.'+loaded) && rootNode.addClass(expanded).next('.'+subtree).show();
					openRoot = false;
				}
				
				if (!current.is('.'+active)) {
					tree.find('.'+navdir+'.'+active).removeClass(active);
					current.addClass(active);
				}

				if (opts.syncTree) {
					if (current.length) {
						current.parentsUntil('.'+root).filter('.'+subtree).show().prev('.'+navdir).addClass(expanded);
					} else if (fm.newAPI) {
						fm.request({
							data : {cmd : 'parents', target : cwd},
							preventFail : true
						})
						.done(function(data) {
							var dirs = filter(data.tree);
							updateTree(dirs);
							updateArrows(dirs, loaded);
							cwd == fm.cwd().hash && sync();
						});
					}
				}
			}