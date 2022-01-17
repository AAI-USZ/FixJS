function htmlLineDiv(left, top, right, bottom, color, style, id, extension,
		content) {
	if (color == undefined) {
		color = "#000000";
	}

	if (id == undefined) {
		id = freshId();
	}

	if (extension == undefined) {
		extension = "";
	}

	if (content == undefined) {
		content = "";
	}

	if (right < left) {
		var tri = left;
		left = right;
		right = tri;
	}
	if (bottom < top) {
		var tri = bottom;
		bottom = top;
		top = tri;
	}

	var width = Math.sqrt((right - left) * (right - left) + (bottom - top)
			* (bottom - top));
	var angle = Math.atan2(bottom - top, right - left) * 180.0 / Math.PI;

	var html = "<div id=\"" + id + "\" style=\"";

	html += "position: absolute;";
	html += "background: " + color + ";";
	html += "height: 4px;";
	html += "width: " + width + "px;";
	html += "z-index: 2;";

	html += "transform-origin: 0% 50%;";
	html += "-webkit-transform-origin: 0% 50%;";
	html += "-moz-transform-origin: 0% 50%;";

	html += "transform: rotate(" + angle + "deg);";
	html += "-webkit-transform: rotate(" + angle + "deg);";
	html += "-moz-transform: rotate(" + angle + "deg);";

	html += style;

	html += "\" " + extension + ">" + content + "</div>";
	return html;
}