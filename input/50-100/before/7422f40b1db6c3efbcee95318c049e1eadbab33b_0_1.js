function(field_of_view, near, far, aspect_ratio) {
	var size = near * Math.tan((field_of_view / (180 * Math.PI)) / 2);
	return this.makeFrustum(-size, size, -size / aspect_ratio, size / aspect_ratio, near, far);
}