function() {
	img_src = '/images/spinner.gif';

	function createSpinner() {
		return $('<img/>', {
			src: img_src,
			class: 'spinner'
		});
	}

	$('.pagination a').on('click', function(e) {
		e.preventDefault();

		var $el = $(e.target);
		$el.closest('.pagination').append(createSpinner());
		target = $('branches');
		$.pjax({
			url: $el.attr('href'),
			container: '#page'
		});
	});
}