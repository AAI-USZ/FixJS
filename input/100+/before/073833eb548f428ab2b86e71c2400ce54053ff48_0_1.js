function( v )
{
	this.currentBlock += v;
	if( this.currentBlock < 0 )
		this.currentBlock = meta.blocks.availableTypes.length - 1;
	else if( this.currentBlock > meta.blocks.availableTypes.length - 1 )
	{
		this.currentBlock = 0;
	}
	console.log( meta.blocks.availableTypes[this.currentBlock] );
}