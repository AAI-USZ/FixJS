function(origData) {
				var self = this, 
					form = $('.cms-edit-form').get(0),
					id = form ? $(form.ID).val() : null;

				// check if a form with a valid ID exists
				if(id) {
					var parentID = $(form.ParentID).val(), 
						parentNode = this.find('li[data-id='+parentID+']');
						node = this.find('li[data-id='+id+']'),
						title = $((form.TreeTitle) ? form.TreeTitle : form.Title).val(),
						className = $(form.ClassName).val();

					// set title (either from TreeTitle or from Title fields)
					// Treetitle has special HTML formatting to denote the status changes.
					if(title) this.jstree('rename_node', node, title);

					// check if node exists, might have been created instead
					if(!node.length) {
						this.jstree(
							'create_node', 
							parentNode, 
							'inside', 
							{
								data: '', 
								attr: {
									'data-class': className, 
									'class': 'class-' + className, 
									'data-id': id
								}
							},
							function() {
								var newNode = self.find('li[data-id='+id+']');
								// TODO Fix replacement of jstree-icon inside <a> tag
								newNode.find('a:first').html(title).attr('href', ss.i18n.sprintf(
									self.data('urlEditpage'), id
								));
								self.jstree('deselect_node', parentNode);
								self.jstree('select_node', newNode);
							}
						);
						// set current tree element
						this.jstree('select_node', node);
					}

					// set correct parent (only if it has changed)
					if(parentID && parentID != node.parents('li:first').data('id')) {
						this.jstree('move_node', node, parentNode.length ? parentNode : -1, 'last');
					}

					this.jstree('select_node', node);
				} else {
					// If no ID exists in a form view, we're displaying the tree on its own,
					// hence to page should show as active
					this.jstree('deselect_all');

					if(typeof origData != 'undefined') {
						var node = this.find('li[data-id='+origData.ID+']');
						if(node && node.data('id') !== 0) this.jstree('delete_node', node);
					}
				}

			}