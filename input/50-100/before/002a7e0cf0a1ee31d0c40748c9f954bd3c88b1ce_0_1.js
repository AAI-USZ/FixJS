function(idx, value){
        console.log('restoring block %s', idx);
        var block = Block(value);
        workspace.append(block);
        block.css({position: 'relative', left: 0, top: 0, display: 'block'});
        block.trigger('add_to_workspace');
        $('.scripts_workspace').trigger('add');

    }