function()
{
	if (this.fixedCellCountX == null)
	{
		this.scaleFactor = 1.0;
		this.maxX = Math.ceil(this.viewWidth / this.cellWidth);
		this.maxY = Math.ceil(this.viewHeight / this.cellHeight / 2);
	}
	else
	{
		this.maxX = this.fixedCellCountX;

		// Work out how much scaling to apply
		this.scaleFactor = this.viewWidth / this.cellWidth / this.fixedCellCountX;

		// Also adjust the maximum y
		this.maxY = Math.ceil(this.viewHeight / this.cellHeight / this.scaleFactor);
	}
}