function(files, any) {
				var phash = fm.cwd().hash; 
				// console.log(files)
				try {
					// to avoid problem with draggable
					cwd.children('table,'+fileSelector).remove();
				} catch (e) {
					cwd.html('');
				}

				cwd.removeClass('elfinder-cwd-view-icons elfinder-cwd-view-list')
					.addClass('elfinder-cwd-view-'+(list ? 'list' :'icons'));

				wrapper[list ? 'addClass' : 'removeClass']('elfinder-cwd-wrapper-list');

				list && cwd.html('<table><thead><tr class="ui-state-default"><td >'+msg.name+'</td><td>'+msg.perm+'</td><td>'+msg.mod+'</td><td>'+msg.size+'</td><td>'+msg.kind+'</td></tr></thead><tbody/></table>');
		
				buffer = $.map(files, function(f) { return any || f.phash == phash ? f : null; });
				
				buffer = fm.sortFiles(buffer);
		
				wrapper.bind(scrollEvent, render).trigger(scrollEvent);
		
				trigger();
			}