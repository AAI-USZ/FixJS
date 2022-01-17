function (row) {
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
        }