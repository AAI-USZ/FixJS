function(e){

				//_this._toggleRearrangeBtn(); // don't need this because it is called in the redrawTable

				$('#fuel_notification .rearrange').show();
				$('#toggle_list').parent().addClass('active');
				$('#toggle_tree').parent().removeClass('active');
				$('#list_container').show();
				$('#tree_container').hide();
				$('#pagination').show();
				$('#view_type').val('list');
				$.cookie(itemViewsCookieId, $('#view_type').val(), {path:jqx.config.cookieDefaultPath});
				// lazy load table
				if (!_this.tableLoaded){
					_this.redrawTable();
				}
				return false;
			}