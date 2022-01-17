function(position, orientation) {
	this.data[0] = 1 - (2 * orientation.j * orientation.j + 2 * orientation.k * orientation.k);
	this.data[1] = 2 * orientation.i * orientation.j - 2 * orientation.k * orientation.r;
	this.data[2] = 2 * orientation.i * orientation.k + 2 * orientation.j * orientation.r;
	this.data[3] = 0;
	this.data[4] = 2 * orientation.i * orientation.j + 2 * orientation.k * orientation.r;
	this.data[5] = 1 - (2 * orientation.i * orientation.i + 2 * orientation.k * orientation.k);
	this.data[6] = 2 * orientation.j * orientation.k - 2 * orientation.i * orientation.r;
	this.data[7] = 0;
	this.data[8] = 2 * orientation.i * orientation.k - 2 * orientation.j * orientation.r;
	this.data[9] = 2 * orientation.j * orientation.k + 2 * orientation.i * orientation.r;
	this.data[10] = 1 - (2 * orientation.i * orientation.i + 2 * orientation.j * orientation.j);
	this.data[11] = 0;
	this.data[12] = position.x;
	this.data[13] = position.y;
	this.data[14] = position.z;
	this.data[15] = 1;
	return this;
}