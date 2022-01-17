function( event )
{
    var target = this.getTarget( event );
    var extent = {};

    if( target == this.controls.outWidth || target == this.controls.outHeight )
    {
	extent.width = 100 * this.getInches( this.controls.outWidth );
	extent.height = 100 * this.getInches( this.controls.outHeight );
	extent.left = -extent.width / 2;
	extent.top = -extent.height / 2;

	if( this.outLine.setExtent( extent ) )
	{
            this.updatePrice();
	    this.redraw();
	}
    }
    else if( target == this.controls.inWidth || target == this.controls.inHeight )
    {
	extent.width = 100 * this.getInches( this.controls.inWidth );
	extent.height = 100 * this.getInches( this.controls.inHeight );
	extent.left = -extent.width / 2;
	extent.top = -extent.height / 2;

	if( this.inLine.setExtent( extent ) )
	{
	    this.updatePrice();
	    this.redraw();
	}
    }
    else if( target == this.controls.border )
    {
	var border = 100 * this.getInches( this.controls.border );
	var outside = this.outLine.getExtent();

	extent.width = outside.width - border;
	extent.height = outside.height - border;
	extent.left = -extent.width / 2;
	extent.top = -extent.height / 2;

	if( this.inLine.setExtent( extent ) )
	{
	    this.updatePrice();
	    this.redraw();
	}
    }
}