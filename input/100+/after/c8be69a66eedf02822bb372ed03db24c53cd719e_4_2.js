function rendering(domain, path, data, info, lang, message, callback) {
        var site = cache.get(domain);
	var layout = data, menu = [], theme, role, languages = [], submenu_tmp = []; 
	if (info) {
		role = info.role;
	} else {
		role = 'guest';
	}
	if (!lang) {
		lang = 0;
	}
	languages[0] = "";
// IMP: THE ORDER, IF SET ANOTHER PATH INTO DATABASE AFTER MENU OR THEME, IT CAN'T BE PARSED
        site.forEach( function (row) {
		if (row.method == path) {
// get the correct lang title, 0 for default if no language choosed
			var pagetitle = row.pagetitle;
			layout.pagetitle = pagetitle.split(',')[lang];
			layout.header = row.header;
			layout.reveal = row.reveal;
			layout.footer = row.footer;
			layout.sidebar = row.sidebar;
//			layout['content_'+path] = row['content_'+path];
			if (row.form && ! data.form) {
				layout.form = JSON.parse(row.form);
			}
			if (row.content) {
				layout.staticcontent = JSON.parse(row.content);
			}
		}	 
		if (row.type == "menu") {
// PUSH ON MENU BASED ON ACL AND CONNECTED USER
			var split_item = row.item;
			// get here the right menu language with the split of the array
			var add = {path: row.path, item: split_item.split(',')[lang]};
			if (row.acl) {
				var acl = row.acl;
				acl = acl.split(',');
				acl.forEach( function (item) {
					if (item == role) {
						menu[row.position] = add;
					}
				});
			} else {
				menu[row.position] = add;
			}
		}
		if (row.type === "submenu") {
			if (row.acl) {
				var acl = row.acl;
				acl = acl.split(',');
				acl.forEach( function (item) {
					if (item == role) {
						submenu_tmp.push(row);
					}
				});
			}
		}
		if (row.type == "language") {
			// to have the choosed language as first element
			if (row.lang_id == lang) {
				languages[0] =row;
			} else {
				languages.push(row);
			}
		}
		if (row.type == "theme") {
			theme = row.html;
		}
        });
	submenu_tmp.forEach( function (row) {
		// IMP: ADD THIS BECAUSE SOME PATH COULD HAVE RESTRICTED MODULE
		if(menu[row.parent_position]) {
			var split_item = row.submenu_item;
			var add = {submenu_path: row.submenu_path, submenu_item: split_item.split(',')[lang]};
			// get the parent position and update with the submenu
			var temp = menu[row.parent_position];
			// the first time is empty parent definition
			if (!temp.is_parent) {
				temp.is_parent = {submenu: []};
			}
			temp.is_parent.submenu[row.position] = add;
			menu[row.parent_position] = temp;
		}
	});
	var site_lang = cache.get(domain+'_lang');
        site_lang.forEach( function (row) {
		if ((row.type === "message") && (row.tag === message.reference)) {
			layout.message = {
				action: message.action,
				message: row.text + message.value
			};
		}
// define the content by language that pass to mustache rendering 
		if ((row.type === "content") && (row.lang_id == lang)) {
			layout[row.tag] = row.text;
		}				 
	});
// delete empty items in the menu's array
	menu = menu.filter(function () {return true});
	layout.menu = menu;
// display language choose only if there are more than on language
	if (languages.length > 1) {
		layout.more_language = true;
		layout.languages = languages;
	}
	var template = Hogan.compile(theme);
	var output = template.render(layout);
	callback(output);
}