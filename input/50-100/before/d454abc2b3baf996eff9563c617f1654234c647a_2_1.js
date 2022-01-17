function ()
{
	document.getElementById(this.opt.sImageId).src = this.opt.sImagesUrl + "/" + (this.bCollapsed ? this.opt.sImageCollapsed : this.opt.sImageExpanded);
	document.getElementById(this.opt.sContainerId).style.display = this.bCollapsed ? '' : 'none';

	this.bCollapsed = !this.bCollapsed;
}