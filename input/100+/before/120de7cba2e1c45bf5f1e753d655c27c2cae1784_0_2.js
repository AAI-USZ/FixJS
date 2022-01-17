function(){
				this._super();

				// Don't reapply (expensive) tree behaviour if already present
				if($.isNumeric(this.data('jstree_instance_id'))) return;
				
				var hints = this.attr('data-hints');
				if(hints) this.setHints($.parseJSON(hints));
				
				/**
				 * @todo Icon and page type hover support
				 * @todo Sorting of sub nodes (originally placed in context menu)
				 * @todo Refresh after language <select> change (with Translatable enabled)
				 * @todo Automatic load of full subtree via ajax on node checkbox selection (minNodeCount = 0)
				 *  to avoid doing partial selection with "hidden nodes" (unloaded markup)
				 * @todo Disallow drag'n'drop when node has "noChildren" set (see siteTreeHints)
				 * @todo Disallow moving of pages marked as deleted 
				 *  most likely by server response codes rather than clientside
				 * @todo "defaultChild" when creating a page (sitetreeHints)
				 * @todo Duplicate page (originally located in context menu)
				 * @todo Update tree node title information and modified state after reordering (response is a JSON array)
				 * 
				 * Tasks most likely not required after moving to a standalone tree:
				 * 
				 * @todo Context menu - to be replaced by a bezel UI
				 * @todo Refresh form for selected tree node if affected by reordering (new parent relationship)
				 * @todo Cancel current form load via ajax when new load is requested (synchronous loading)
				 * @todo When new edit form is loaded, automatically: Select matching node, set correct parent,
				 *  update icon and title
				 */
				var self = this;
					this
						.jstree(this.getTreeConfig())
						.bind('loaded.jstree', function(e, data) {
							self.updateFromEditForm();
							self.css('visibility', 'visible');
							// Add ajax settings after init period to avoid unnecessary initial ajax load
							// of existing tree in DOM - see load_node_html()
							data.inst._set_settings({'html_data': {'ajax': {
								'url': self.data('urlTree'),
								'data': function(node) {
									var params = self.data('searchparams') || [];
									// Avoid duplication of parameters
									params = $.grep(params, function(n, i) {return (n.name != 'ID' && n.name != 'value');});
									params.push({name: 'ID', value: $(node).data("id") ? $(node).data("id") : 0});
									params.push({name: 'ajax', value: 1});
									return params;
								}
							}}});
							
							// Only show checkboxes with .multiple class
							data.inst.hide_checkboxes();
						})
						.bind('before.jstree', function(e, data) {
							if(data.func == 'start_drag') {
								// Don't allow drag'n'drop if multi-select is enabled'
								if(!self.hasClass('draggable') || self.hasClass('multiselect')) {
									e.stopImmediatePropagation();
									return false;
								}
							}
							
							if($.inArray(data.func, ['check_node', 'uncheck_node'])) {
								//Don't allow check and uncheck if parent is disabled
								var node = $(data.args[0]).parents('li:first');
								if(node.hasClass('disabled')) {
									e.stopImmediatePropagation();
									return false;
								}
							}
						})
						.bind('move_node.jstree', function(e, data) {
							var movedNode = data.rslt.o, newParentNode = data.rslt.np, oldParentNode = data.inst._get_parent(movedNode);
							var siblingIDs = $.map($(movedNode).siblings().andSelf(), function(el) {
								return $(el).data('id');
							});

							$.ajax({
								'url': self.data('urlSavetreenode'),
								'data': {
									ID: $(movedNode).data('id'), 
									ParentID: $(newParentNode).data('id') || 0,
									SiblingIDs: siblingIDs
								},
								statusCode: {
									403: function() {
										$.jstree.rollback(data.rlbk);
									}
								}
							});
						})
						// Make some jstree events delegatable
						.bind('select_node.jstree check_node.jstree uncheck_node.jstree', function(e, data) {
							$(document).triggerHandler(e, data);
						})
			}