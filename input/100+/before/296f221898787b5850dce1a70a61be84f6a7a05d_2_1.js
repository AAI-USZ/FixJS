function(block) {
        var index = block;
        if (typeof block === 'number') {
            block = this.blocks[index];
        } else {
            index = this.blocks.indexOf(block);
            if (index === -1) {
                return '';
            }
        }
        if (!block.func) {
            block = clone(block);
            block.codes = clone(block.codes);
            if (!block.children) {
            block.children = [];
                for (var i=index, length=this.blocks.length; i<length; ++i) {
                    var childBlock = this.blocks[i];
                    if (childBlock.level === block.level + 1 && !childBlock.parent) {
                        childBlock.parent = block;
                        block.children.push(childBlock);
                    }
                }
            }
            block.jsString = this.translateBlock(block);
        } else {        
            Functions[block.name] = function() {
                return block.func.apply(null, arguments);
            };
        }
        return block.jsString;
    }