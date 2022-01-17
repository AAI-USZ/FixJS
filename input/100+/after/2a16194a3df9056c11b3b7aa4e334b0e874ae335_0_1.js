function(containerID, className, offset, options, isSimpleSorting, additionalParameters) {
		this._additionalParameters = additionalParameters || { };
		this._containerID = $.wcfEscapeID(containerID);
		this._container = $('#' + this._containerID);
		this._className = className;
		this._offset = (offset) ? offset : 0;
		this._proxy = new WCF.Action.Proxy({
			success: $.proxy(this._success, this)
		});
		this._structure = { };
		
		// init sortable
		this._options = $.extend(true, {
			axis: 'y',
			connectWith: '#' + this._containerID + ' .sortableList',
			disableNesting: 'sortableNoNesting',
			errorClass: 'sortableInvalidTarget',
			forcePlaceholderSize: true,
			helper: 'clone',
			items: 'li:not(.sortableNoSorting)',
			opacity: .6,
			placeholder: 'sortablePlaceholder',
			tolerance: 'pointer',
			toleranceElement: '> span'
		}, options || { });
		
		if (isSimpleSorting) {
			$('#' + this._containerID + ' .sortableList').sortable(this._options);
		}
		else {
			$('#' + this._containerID + ' > .sortableList').wcfNestedSortable(this._options);
		}
		
		this._container.find('.formSubmit > button[data-type="submit"]').click($.proxy(this._submit, this));
	}