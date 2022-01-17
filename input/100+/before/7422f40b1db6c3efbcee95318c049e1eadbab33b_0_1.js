function(left, right, bottom, top, near, far) {
	this.makeIdentity();

	var delta_x = right - left;
	var delta_y = top - bottom;
	var delta_z = far - near;
	var n2 = 2 * near;

	this.data[0] = n2 / delta_x;
	this.data[5] = n2 / delta_y;
	this.data[8] = (right + left) / delta_x;
	this.data[9] = (top + bottom) / delta_y;
	this.data[10] = -(far + near) / delta_z;
	this.data[11] = -1;
	this.data[14] = -n2 * far / delta_z;
	this.data[15] = 0;
	return this;
}