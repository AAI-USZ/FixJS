function(flavour){
        var src = process.env.NODE_PATH + '/ngneer/templates/' + flavour + '/index.html',
            dest = process.cwd() + '/index.html';            
        fs.copy(src, dest, console.log);
        console.log('Your', flavour, 'application has been created.');
        console.log('\t', dest);
    }