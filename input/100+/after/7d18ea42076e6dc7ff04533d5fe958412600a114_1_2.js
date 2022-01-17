function(blockName, buf, childFunc) {
		var block = buf.blocks[blockName] = {
			'parent': buf.block || null, //set parent block
			'buf': [], //block get its own buffer
			'pos': buf.length, //block knows where it goes in the main buffer
			'numChildren': 0 //number of child blocks
		};
		//Copy some properties from buf into block.buf
		var copy = ['r', 'blocks', 'func', 'locals', 'cb', 'base', 'rel', 'filename', 'source'];
		for(var i in copy)
			block.buf[copy[i]] = buf[copy[i]];
		/* Set the block property of the buffer so that child blocks know
		this is their parent */
		block.buf.block = block;
		//Update numChildren in parent block
		if(block.parent)
			block.parent.numChildren++;
		//Leave a spot in the buffer for this block
		buf.push('');
		//If parameterized block
		if(childFunc.length > 1)
			block.paramBlock = childFunc;
		else
		{
			try {childFunc(block.buf); }
			catch(e) {blockError(buf, block.buf); throw e;}
		}
	}