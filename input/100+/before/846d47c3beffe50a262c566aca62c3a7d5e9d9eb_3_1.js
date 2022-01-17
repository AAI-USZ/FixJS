function(form) {
	var me = this;
	this.form = form;
	this.opts = {
		sections: [
			{
				title: 'Actions',
				items: [
					{
						type: 'link',
						label: 'New',
						icon: 'icon-plus',
						display: function() { 
							return in_list(profile.can_create, form.doctype) 
						},
						onclick: function() { new_doc(me.form.doctype) }
					},

					{
						type: 'link',
						label: 'List',
						icon: 'icon-list',
						display: function() { 
							return !me.form.meta.issingle && !me.form.meta.read_only; 
						},
						onclick: function() { window.location.href="#!List/" + me.form.doctype }
					},
					
					{
						type: 'link',
						label: 'Refresh',
						icon: 'icon-refresh',
						onclick: function() { me.form.reload_doc() }
					},

					{
						type: 'link',
						label: 'Print',
						display: function() { 
							return !(me.form.doc.__islocal || me.form.meta.allow_print);
						},
						icon: 'icon-print',
						onclick: function() { me.form.print_doc() }
					},

					{
						type: 'link',
						label: 'Email',
						display: function() { 
							return !(me.form.doc.__islocal || me.form.meta.allow_email);
						},
						icon: 'icon-envelope',
						onclick: function() { me.form.email_doc() }
					},

					{
						type: 'link',
						label: 'Copy',
						display: function() { 
							return in_list(profile.can_create, me.form.doctype) && !me.form.meta.allow_copy 
						},
						icon: 'icon-file',
						onclick: function() { me.form.copy_doc() }
					},
					
					{
						type: 'link',
						label: 'Delete',
						display: function() { 
							return (cint(me.form.doc.docstatus) != 1) && !me.form.doc.__islocal
								&& wn.model.can_delete(me.form.doctype);
						},
						icon: 'icon-remove-sign',
						onclick: function() { me.form.savetrash() }
					}
				]
			},

			{
				title: 'Assign To',
				render: function(wrapper) {
					me.form.assign_to = new wn.widgets.form.sidebar.AssignTo(wrapper, me, me.form.doctype, me.form.docname);
				},
				display: function() { 
					if(me.form.doc.__local) return false; 
					else return true;
				}
			},
			
			{
				title: 'Attachments',
				render: function(wrapper) {
					me.form.attachments = new wn.widgets.form.sidebar.Attachments(wrapper, me, me.form.doctype, me.form.docname);
				},
				display: function() { return me.form.meta.allow_attach }
			},

			{
				title: 'Comments',
				render: function(wrapper) {
					new wn.widgets.form.sidebar.Comments(wrapper, me, me.form.doctype, me.form.docname);
				},
				display: function() { return !me.form.doc.__islocal }
			},

			{
				title: 'Tags',
				render: function(wrapper) {
					me.form.taglist = new TagList(wrapper, 
						me.form.doc._user_tags ? me.form.doc._user_tags.split(',') : [], 
						me.form.doctype, me.form.docname, 0, 
						function() {	});
				},
				display: function() { return !me.form.doc.__islocal }
			},
			
			{
				title: 'Users',
				render: function(wrapper) {
					var doc = cur_frm.doc;
					var scrub_date = function(d) {
						if(d)t=d.split(' ');else return '';
						return dateutil.str_to_user(t[0]) + ' ' + t[1];
					}
					
					$(wrapper).html(repl('<p>Created:<br> <span class="avatar-small">\
							<img title="%(created_by)s" src="%(avatar_created)s" /></span> \
							<span class="help small">%(creation)s</span></p>\
							<p>Modified:<br> <span class="avatar-small">\
							<img title="%(modified_by)s" src="%(avatar_modified)s" /></span> \
							<span class="help small">%(modified)s</span></p>', {
								created_by: wn.user_info(doc.owner).fullname,
								avatar_created: wn.user_info(doc.owner).image,
								creation: scrub_date(doc.creation),
								modified_by: wn.user_info(doc.modified_by).fullname,
								avatar_modified: wn.user_info(doc.modified_by).image,
								modified: scrub_date(doc.modified)
							}));
				},
				display: function() { return !me.form.doc.__islocal }
			}
		]
	}
	
	this.refresh = function() {
		var parent = this.form.page_layout.sidebar_area;
		if(!this.sidebar) {
			//$y(parent, {paddingTop:'37px'})
			this.sidebar = new wn.widgets.PageSidebar(parent, this.opts);
		} else {
			this.sidebar.refresh();
		}
	}
	

}