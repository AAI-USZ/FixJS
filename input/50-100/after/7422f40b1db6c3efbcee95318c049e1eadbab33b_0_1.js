function(field_of_view, near, far, aspect_ratio) {
	var top = near * Math.tan(field_of_view * Math.PI / 360),
		right = top * aspect_ratio;
	return this.makeFrustum(-right, right, -top, top, near, far);
}