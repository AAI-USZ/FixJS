function(wrapper) {
	erpnext.blog_list = new wn.ui.Listing({
		parent: $(wrapper).find('#blog-list').get(0),
		query: 'select tabBlog.name, title, left(content, 1000) as content, tabBlog.creation, \
			ifnull(first_name, "") as first_name, ifnull(last_name, "") as last_name \
			from tabProfile, tabBlog\
		 	where ifnull(published,0)=1 and tabBlog.owner = tabProfile.name \
			order by tabBlog.creation desc',
		hide_refresh: true,
		no_toolbar: true,
		render_row: function(parent, data) {
			if(data.content && data.content.length==1000) {
				data.content += repl('... <a href="%(name)s.html">(read on)</a>', data);
			}
			data.content = wn.markdown(data.content);
			if(data.last_name) data.last_name = ' ' + data.last_name;
			data.date = prettyDate(data.creation);
			parent.innerHTML = repl('<h2><a href="%(name)s.html">%(title)s</a></h2>\
				<p><div class="help">By %(first_name)s%(last_name)s, %(date)s</div></p>\
				<p>%(content)s</p><br>', data)
				//<a href="%(name)s.html">Read Full Text</a><br>', data);
		},
		page_length: 10
	});
	erpnext.blog_list.run();
}