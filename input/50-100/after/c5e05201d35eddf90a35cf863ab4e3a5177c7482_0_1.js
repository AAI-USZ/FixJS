function getIndexOfOwningEditItem(element, editItemSelector)
	{
		return $(element).closest(editItemSelector).index(editItemSelector);
	}