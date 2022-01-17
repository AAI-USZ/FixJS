function() {
	expect( 4 );
	$.each(['horizontal', 'vertical'], function(i, orientation) {
		el = $('<div></div>');
		options = {
			max: 100,
			min: 0,
			orientation: orientation,
			step: 1
		};
		el.slider(options);

		el.slider("value", 70);

		handle().simulate("keydown", { keyCode: $.ui.keyCode.PAGE_UP });
		equal(el.slider("value"), 90);

		handle().simulate("keydown", { keyCode: $.ui.keyCode.PAGE_UP });
		equal(el.slider("value"), 100);

		el.slider("destroy");
	});
}