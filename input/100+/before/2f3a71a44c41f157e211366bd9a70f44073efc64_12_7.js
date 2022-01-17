function()

{

    // Set the title bar button width

    this.windowTitle.bgElement.rectAttributes.width = this.windowParams.width - this.windowParams.titleBarHeight;

    this.windowTitle.refreshLayout();

	this.titleBar.refreshLayout();

    

    this.scrollbarRegion.params.width = this.windowParams.width;

    this.scrollbarRegion.params.height = this.windowParams.height - this.windowParams.titleBarHeight - 3 - this.windowParams.statusBarHeight;    

    this.scrollbarRegion.refreshLayout();

    this.bgRect.setAttribute("x", -this.borderWidth);

    this.bgRect.setAttribute("y", -this.borderWidth);    

    this.bgRect.setAttribute("width", this.windowParams.width + this.borderWidth * 2);

    this.bgRect.setAttribute("height", this.windowParams.height + this.borderWidth * 2);



    this.fgRect.setAttribute("x", -this.borderWidth);

    this.fgRect.setAttribute("y", -this.borderWidth);    

    this.fgRect.setAttribute("width", this.windowParams.width + this.borderWidth * 2);

    this.fgRect.setAttribute("height", this.windowParams.height + this.borderWidth * 2);

	

	if (this.isDragging)

		this.windowStatusText.setValue(this.windowParams.width + "x" + this.windowParams.height);

	

    this.windowStatus.rectAttributes.width = this.windowParams.width - 10;

    this.windowStatus.refreshLayout();

    this.statusBar.setPosition(0, this.windowParams.height - this.windowParams.statusBarHeight);    

	this.statusBar.refreshLayout();

	this.windowContents.refreshLayout();

}