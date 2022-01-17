function(block, start, end, unshift, increment, compare) {
        increment = increment || '++';
        var id = '__i';
        var childBlock = block.children.shift();
        compare = compare || '<';
        if (unshift) {
            childBlock.codes.unshift({ type: 'pushVariable', variable: id });
        }
        return 'for (var ' + id + ' = ' + start + '; ' + id + compare + end + '; ' + id + 
            increment + ')' + this.addJSBlock(childBlock);
    }