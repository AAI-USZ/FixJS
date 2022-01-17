function(resJSON,uid) {
		var myContainer = new Element('div');
		var myForm = new Element('form', {'id': 'user_edit'});
		var mynRow = new Element('div', {'class': 'row'});
		var mynLabel = new Element('label', {'for': 'login', 'html': 'User login'});
		var mynName = new Element('input', {'type': 'text', 'name': 'login'});
		mynRow.adopt(mynLabel);
		mynRow.adopt(mynName);
		myForm.adopt(mynRow);

	 	var myfnRow = new Element('div', {'class': 'row'});
		var myfnLabel = new Element('label', {'for': 'full_name', 'html': 'User full name'});
		var myfnName = new Element('input', {'type': 'text', 'name': 'full_name', 'class': 'large'});
		myfnRow.adopt(myfnLabel);
		myfnRow.adopt(myfnName);
		myForm.adopt(myfnRow);

		
		var myemRow = new Element('div', {'class': 'row'});
		var myemLabel = new Element('label', {'for': 'email', 'html': 'User email'});
		var myemName = new Element('input', {'type': 'text', 'name': 'email', 'class': 'medium'});
		myemRow.adopt(myemLabel);
		myemRow.adopt(myemName);
		myForm.adopt(myemRow);


		var myUid = new Element('input', {'name': 'uid', 'type': 'hidden', 'value': 0});
		var myaRow = new Element('div', {'class': 'link row'});
		var myaLabel = new Element('label', {'for': 'active', 'html': 'User is active'});
		var myActive = new Element('input', {'name': 'active', 'type': 'checkbox'});
		myaRow.adopt(myaLabel);
		myaRow.adopt(myActive);
		myaRow.adopt(myUid);
		myForm.adopt(myaRow);
		
		var mypwRow = new Element('div', {'class': 'row'});
		var mypwLabel = new Element('label', {'for': 'password', 'html': 'User password'});
		var mypwName = new Element('input', {'type': 'password', 'name': 'password', 'value' : '', 'class': 'medium'});
		mypwRow.adopt(mypwLabel);
		mypwRow.adopt(mypwName);
		myForm.adopt(mypwRow);
			
		var mywpRow = new Element('div', {'class': 'row'});
		var mywpLabel = new Element('label', {'for': 'password2', 'html': 'Retype password'});
		var mywpName = new Element('input', {'type': 'password', 'name': 'password2', 'value' : '', 'class': 'medium'});
		mywpRow.adopt(mywpLabel);
		mywpRow.adopt(mywpName);
		myForm.adopt(mywpRow);
		myContainer.adopt(myForm);
		umod.setTitle("<h1>Add user</h1>");
		umod.setBody(myContainer.get('html'));
		// assign var in edit mode 
		if (resJSON) {
			$('user_edit').getChildren('div input').each(function(item) {
				if (item.get('name') == 'login') item.set('value', resJSON.login);
				if (item.get('name') == 'uid') { 
					item.set('value', resJSON.uid);
				}
				if (item.get('name') == 'full_name') item.set('value', resJSON.full_name);
				if (item.get('name') == 'email') item.set('value', resJSON.email);
				if (item.get('name') == 'active') {
					item.set('value', resJSON.status); 
					if (resJSON.status == 1) item.set('checked', 'checked'); 
					item.addEvent('click', function(event) {
						if (item.get('value') == 0) {
							item.set('value', 1);
							item.set('checked', 'checked');
						} else {
							item.set('value', 0);
							item.removeProperty('checked');

						}	
					});
				}
			});
		}
		umod.setFooter('<a class="btn primary" onclick="myuser.saveUser()">Save</a>');
		umod.show();
	}