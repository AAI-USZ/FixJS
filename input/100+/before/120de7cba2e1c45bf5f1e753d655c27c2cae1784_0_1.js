function(e, data) {
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
						}