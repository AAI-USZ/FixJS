f$(wrapper).html(repl('<p>Created:<br> <span class="avatar-small">\
       <img title="%(created_by)s" src="%(avatar_created)s" /></span> \
       <span class="help small">%(creation)s</span></p>\
       <p>Modified:<br> <span class="avatar-small">\
       <img title="%(modified_by)s" src="%(avatar_modified)s" /></span> \
       <span class="help small">%(modified)s</span></p>',{created_by:wn.user_info(doc.owner).fullname,avatar_created:wn.user_info(doc.owner).image,creation:scrub_date(doc.creation),modified_by:wn.user_info(doc.modified_by).fullname,avatar_modified:wn.user_info(doc.modified_by).image,modified:scrub_date(doc.modified)}));},display:function(){return!me.form.doc.__islocal}},{title:'Help',render:function(wrapper){$(wrapper).html('<div class="help small">'
