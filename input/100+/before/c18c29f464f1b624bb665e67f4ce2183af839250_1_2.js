function() {
				var self = this;
				return {
					'core': {
						'initially_open': ['record-0'],
						'animation': 0,
						'html_titles': true
					},
					'html_data': {
						// 'ajax' will be set on 'loaded.jstree' event
					},
					'ui': {
						"select_limit" : 1,
						'initially_select': [this.find('.current').attr('id')]
					},
					 "crrm": {
						 'move': {
							// Check if a node is allowed to be moved.
							// Caution: Runs on every drag over a new node
							'check_move': function(data) {
								var movedNode = $(data.o), newParent = $(data.np), 
									isMovedOntoContainer = data.ot.get_container()[0] == data.np[0],
									movedNodeClass = movedNode.getClassname(), 
									newParentClass = newParent.getClassname(),
									// Check allowedChildren of newParent or against root node rules
									hints = self.getHints(),
									disallowedChildren = [],
									hintKey = newParentClass ? newParentClass : 'Root',
									hint = (typeof hints[hintKey] != 'undefined') ? hints[hintKey] : null;

								// Special case for VirtualPage: Check that original page type is an allowed child
								if(hint && movedNode.attr('class').match(/VirtualPage-([^\s]*)/)) movedNodeClass = RegExp.$1;
								
								if(hint) disallowedChildren = (typeof hint.disallowedChildren != 'undefined') ? hint.disallowedChildren : [];
								var isAllowed = (
									// Don't allow moving the root node
									movedNode.data('id') !== 0 
									// Only allow moving node inside the root container, not before/after it
									&& (!isMovedOntoContainer || data.p == 'inside')
									// Children are generally allowed on parent
									&& !newParent.hasClass('nochildren')
									// movedNode is allowed as a child
									&& (!disallowedChildren.length || $.inArray(movedNodeClass, disallowedChildren) == -1)
								);
								
								return isAllowed;
							}
						}
					},
					'dnd': {
						"drop_target" : false,
						"drag_target" : false
					},
					'checkbox': {
						'two_state': true
					},
					'themes': {
						'theme': 'apple',
						'url': $('body').data('frameworkpath') + '/thirdparty/jstree/themes/apple/style.css'
					},
					// Caution: SilverStripe has disabled $.vakata.css.add_sheet() for performance reasons,
					// which means you need to add any CSS manually to framework/admin/scss/_tree.css
					'plugins': [
						'html_data', 'ui', 'dnd', 'crrm', 'themes', 
						'checkbox' // checkboxes are hidden unless .multiple is set
					]
				};
			}