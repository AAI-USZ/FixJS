function(path,cb){
        fs.readFile(path,'utf8',onModelCb(cb));
    }