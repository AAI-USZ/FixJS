function(block, start, end, id, increment, compare) {
        increment = increment || '++';
        var childBlock = block.children.shift();
        compare = compare || '<';
        if (id) {
            childBlock.codes.shift();
        } else {
            id = '__i';
        }
        var declare = 'var ' + id + ' = ' + start ;
        return 'for (' + declare + '; ' + id + compare + end + '; ' + id + 
            increment + ')' + this.addJSBlock(childBlock);
    }