function()
{
    var outside = this.outLine.getExtent();
    var inside = this.inLine.getExtent();

    $(this.controls.outWidth).val( (Math.round( outside.width ) / 100) + " in" );
    $(this.controls.outHeight).val( (Math.round( outside.height ) / 100) + " in" );

    this.context.save();
    this.context.transform( this.zoom, 0, 0, this.zoom, this.origin.x, this.origin.y );
    this.outLine.trace( this.context );
    this.context.restore();

    this.context.fillStyle = "#eda";
    this.context.strokeStyle = "#000";
    this.context.lineWidth = 3;
    this.context.fill();
    this.context.stroke();

    this.context.save();
    this.context.transform( this.zoom, 0, 0, this.zoom, this.origin.x, this.origin.y );
    this.inLine.trace( this.context );
    this.context.restore();

    $(this.controls.inWidth).val( (Math.round( inside.width ) / 100) + " in" );
    $(this.controls.inHeight).val( (Math.round( inside.height ) / 100) + " in" );

    if( outside.width - inside.width == outside.height - inside.height )
	$(this.controls.border).val( (Math.round( outside.width - inside.width ) / 200) + " in" );
    else
	$(this.controls.border).val( "" );

    var gradient = this.context.createLinearGradient( 0, 0, this.canvas.width, this.canvas.height );
    gradient.addColorStop( 0, "#aaa" );
    gradient.addColorStop( 1, "#fff" );

    this.context.fillStyle = gradient;
    this.context.lineWidth = 2;
    this.context.fill();
    this.context.stroke();
}