function PlaceholderEnter(sender) {
	if (sender.tagName == 'SELECT') return;
	$(sender).removeClass('utopia-placeholder');
	if (sender.value == $(sender).attr('placeholder'))
		sender.value = '';
}