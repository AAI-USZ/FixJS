function(block, blockKind) {
        var scanner = this.scanner;
        var childBlock = newBlock(this.blocks, block.level + 1, blockKind);
        block.children = block.children || [];
        block.children.push(childBlock);
        childBlock.parent = block;
        this.parseBlock(childBlock, null, false);
    }