function(zIndex)
{
	mixin(new ObjectContainer(zIndex), this);

	if (this.preTransformEffects == null)
		this.preTransformEffects = new Array(0);

	this.preTransformEffects.push(function(transform) {
		transform.reset();
	});
}