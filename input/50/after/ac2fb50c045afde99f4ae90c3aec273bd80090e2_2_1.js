function(file){
            var filepath = path + "/" + file;
            if (!fs.statSync(filepath).isDirectory()) {
                data[file] = fs.readFileSync(filepath, 'utf-8');
            }
        }