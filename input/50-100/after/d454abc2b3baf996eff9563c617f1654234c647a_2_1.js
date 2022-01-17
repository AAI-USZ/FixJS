function ()
{
	document.getElementById(this.opt.sImageId).src = this.opt.sImagesUrl + "/" + (this.bCollapsed ? this.opt.sImageCollapsed : this.opt.sImageExpanded);
	$('#' + this.opt.sContainerId).slideToggle();

	this.bCollapsed = !this.bCollapsed;
}