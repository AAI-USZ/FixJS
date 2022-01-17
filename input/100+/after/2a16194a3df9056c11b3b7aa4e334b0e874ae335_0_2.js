function() {
		// reset structure
		this._structure = { };
		
		// build structure
		this._container.find('.sortableList').each($.proxy(function(index, list) {
			var $list = $(list);
			var $parentID = $list.data('objectID');
			
			if ($parentID !== undefined) {
				$list.children(this._options.items).each($.proxy(function(index, listItem) {
					var $objectID = $(listItem).data('objectID');
					
					if (!this._structure[$parentID]) {
						this._structure[$parentID] = [ ];
					}
					
					this._structure[$parentID].push($objectID);
				}, this));
			}
		}, this));
		
		// send request
		var $parameters = $.extend(true, {
				data: {
					offset: this._offset,
					structure: this._structure
				}
		}, this._additionalParameters);
		
		this._proxy.setOption('data', {
			actionName: 'updatePosition',
			className: this._className,
			parameters: $parameters
		});
		this._proxy.sendRequest();
	}