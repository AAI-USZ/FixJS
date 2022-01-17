function() {
	/**
	* DATA-TOOLTIP
	* Apply a tooltip to an item without having to call $(selector).tooltip()
	*
	*	<a href="#" data-tooltip="Tooltip to display"></a>
	*
	*/
	$('[data-tooltip]').each(function() {
		$(this).tooltip({title: $(this).data('tooltip')});
	});
}