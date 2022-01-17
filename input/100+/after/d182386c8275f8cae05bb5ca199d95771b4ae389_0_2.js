function(point) {

	if (textToolBegin) {

		console.log('textTool.end'+point);

		if (textToolOutline) {

			textToolOutline.remove();

			textToolOutline = undefined;

		}

		var width = Math.abs(point.x-textToolBegin.x);

		var x = (point.x+textToolBegin.x)/2;

		var y = (point.y+textToolBegin.y)/2;

		textToolBegin = undefined;

		createTextBlock(new paper.Point(x, y), ['testing','testing','1, 2, 3...']);

	}

}