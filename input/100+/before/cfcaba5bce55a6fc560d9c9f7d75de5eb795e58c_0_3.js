function() {
								var newNode = self.find('li[data-id='+id+']');
								// TODO Fix replacement of jstree-icon inside <a> tag
								newNode.find('a:first').html(title).attr('href', ss.i18n.sprintf(
									urlEditPage, id
								));
								self.jstree('deselect_all');
								self.jstree('select_node', newNode);
							}