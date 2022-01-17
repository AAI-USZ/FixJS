function() {
	/**
	* DATA-TIP
	* Apply a tooltip to an item without having to call $(selector).tooltip()
	* For various weird reasons 'data-tooltip' cant be used so 'data-tip' will have to suffice.
	*
	*	<a href="#" data-tooltip="Tooltip to display"></a>
	*
	* Additional parameters:
	*
	*	* data-tooltip-placement - Set the tooltip position
	*
	*/
	$('[data-tip]').each(function() {
		settings = {title: $(this).data('tip')};
		if ($(this).data('tip-placement'))
			settings['placement'] = $(this).data('tip-placement');
		$(this).tooltip(settings);
	});
}