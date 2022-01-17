function(file) {
        var contents,
            out = {
                path: {
                    full: path.join(this.options.root, file),
                    relative: file
                },
                contents: null
            };

        contents = fs.readFileSync(out.path.full, "utf-8");

        if(contents) {
            out.contents = contents;
            return out;
        }
    }