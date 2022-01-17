function closePath(ctx, params) {
	// Mask shape/path if chosen
	if (params.mask) {
		if (params.autosave) {ctx.save();}
		ctx.clip();
	}
	// Close path if chosen
	if (params.closed) {
		ctx.closePath();
	}
	ctx.fill();
	// Prevent extra shadow created by stroke (but only when fill is present)
	if (params.fillStyle !== 'transparent') {
		ctx.shadowColor = 'transparent';
	}
	ctx.stroke();
	// Close path if chosen
	if (!params.closed) {
		ctx.closePath();
	}
}