function(data) {
		if(data.file_list) {
			data.imgsrc = 'files/' + data.file_list.split('\n')[0].split(',')[1];
		} else {
			data.imgsrc = 'images/lib/ui/no_img_' + (data.gender=='Female' ? 'f' : 'm') + '.gif';
		}
		data.fullname = wn.user_info(data.name).fullname;
		data.delete_html = '';
		if(!data.enabled) 
			data.delete_html = '<a class="close" title="delete">&times;</a>';
		
		$(wn.pages.users).find('.layout-main').append(repl('<div class="user-card" data-name="%(name)s">\
			%(delete_html)s\
			<img src="%(imgsrc)s">\
			<div class="user-info">\
				<b class="user-fullname">%(fullname)s</b><br>\
				%(name)s<br>\
				<button class="btn btn-small user-roles"><i class="icon-user"></i> Roles</button>\
				<button class="btn btn-small user-settings"><i class="icon-cog"></i> Settings</button>\
			</div>\
		</div>', data));
		
		if(!data.enabled) {
			$(wn.pages.users).find('.layout-main .user-card:last')
				.addClass('disabled')
				.find('.user-fullname').html('Disabled');
		}
	}