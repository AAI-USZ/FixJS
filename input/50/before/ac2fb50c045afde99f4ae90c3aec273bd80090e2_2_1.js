function(file){
            data[file] = fs.readFileSync(path + "/" + file, 'utf-8');
        }