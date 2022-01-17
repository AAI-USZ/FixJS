function(wrapper) {
	erpnext.blog_list = new wn.ui.Listing({
		parent: $(wrapper).find('#blog-list').get(0),
		method: 'website.blog.get_blog_list',
		hide_refresh: true,
		no_toolbar: true,
		render_row: function(parent, data) {
			if(data.content && data.content.length==1000) {
				data.content += repl('... <a href="%(name)s.html">(read on)</a>', data);
			}
			parent.innerHTML = repl('<h2><a href="%(name)s.html">%(title)s</a></h2>\
				<p>%(content)s</p><br>', data);
		},
		page_length: 10
	});
	erpnext.blog_list.run();
}