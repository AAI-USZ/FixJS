function(flavour){
        var src = './templates/' + flavour + '/index.html',
            dest = process.cwd() + '/index.html';            
        fs.copy(src, dest, console.log);
    }