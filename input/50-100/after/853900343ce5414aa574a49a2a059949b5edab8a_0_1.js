function(node) {
        console.log('node.name = ' + node.name);
        if(node.name == 'name') {
            console.log('node.value = ' + node.value);
            console.log('node.source = ' + node.source());
            console.log('node.label = ' + node.label());
        }
    }