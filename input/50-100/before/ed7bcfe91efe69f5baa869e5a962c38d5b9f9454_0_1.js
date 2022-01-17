function FilterOnEnter(sender) {
	isFiltering = true;
	if (sender.tagName == 'SELECT') return;
	$(sender).removeClass('utopia-filter-default');
	if (sender.value == $(sender).attr('title'))
		sender.value = '';
}